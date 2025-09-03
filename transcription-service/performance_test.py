#!/usr/bin/env python3
"""
Performance Testing Script for Cloud-Native Transcription Service
Tests 100 concurrent file uploads and provides comprehensive metrics.
"""

import asyncio
import aiohttp
import time
import json
import statistics
from pathlib import Path
import logging
from typing import List, Dict, Any

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class PerformanceTest:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip('/')
        self.upload_times = []
        self.processing_times = []
        self.end_to_end_times = []
        self.error_count = 0
        self.success_count = 0
        
    async def create_test_audio_file(self) -> bytes:
        """Create a mock audio file for testing (5-minute equivalent)"""
        # Create a 5MB mock audio file (approximately 5 minutes of audio)
        return b'MOCK_AUDIO_DATA' * (5 * 1024 * 1024 // 15)
    
    async def upload_file(self, session: aiohttp.ClientSession, file_data: bytes, test_id: int) -> Dict[str, Any]:
        """Upload a single file and measure performance"""
        start_time = time.time()
        
        try:
            # Create form data
            form_data = aiohttp.FormData()
            form_data.add_field('file', file_data, filename=f'test_audio_{test_id}.mp3', content_type='audio/mpeg')
            form_data.add_field('model', 'openai-whisper')
            
            # Upload file
            async with session.post(f'{self.base_url}/v1/transcripts', data=form_data) as response:
                upload_end_time = time.time()
                upload_time = upload_end_time - start_time
                
                if response.status != 202:
                    logger.error(f"Upload failed for test {test_id}: {response.status}")
                    self.error_count += 1
                    return {'success': False, 'upload_time': upload_time}
                
                result = await response.json()
                job_id = result['job_id']
                
                # Monitor job completion
                processing_start = time.time()
                job_completed = False
                job_result = None
                
                while not job_completed and (time.time() - processing_start) < 300:  # 5-minute timeout
                    await asyncio.sleep(2)
                    
                    async with session.get(f'{self.base_url}/v1/transcripts/{job_id}') as status_response:
                        if status_response.status == 200:
                            job_status = await status_response.json()
                            if job_status['status'] == 'completed':
                                job_completed = True
                                job_result = job_status
                                break
                            elif job_status['status'] == 'failed':
                                logger.error(f"Job {job_id} failed: {job_status.get('error', 'Unknown error')}")
                                self.error_count += 1
                                return {'success': False, 'upload_time': upload_time}
                
                end_time = time.time()
                processing_time = end_time - processing_start
                end_to_end_time = end_time - start_time
                
                if job_completed:
                    self.success_count += 1
                    return {
                        'success': True,
                        'upload_time': upload_time,
                        'processing_time': processing_time,
                        'end_to_end_time': end_to_end_time,
                        'job_id': job_id,
                        'result': job_result
                    }
                else:
                    logger.error(f"Job {job_id} timed out")
                    self.error_count += 1
                    return {'success': False, 'upload_time': upload_time, 'timeout': True}
                    
        except Exception as e:
            logger.error(f"Test {test_id} failed with exception: {str(e)}")
            self.error_count += 1
            return {'success': False, 'upload_time': time.time() - start_time, 'error': str(e)}
    
    async def run_concurrent_test(self, num_concurrent: int = 100) -> Dict[str, Any]:
        """Run concurrent performance test"""
        logger.info(f"🚀 Starting performance test with {num_concurrent} concurrent uploads")
        
        # Create test file data
        file_data = await self.create_test_audio_file()
        logger.info(f"📁 Created test file: {len(file_data) / (1024*1024):.1f}MB")
        
        # Test API health first
        async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=600)) as session:
            try:
                async with session.get(f'{self.base_url}/health') as response:
                    if response.status != 200:
                        raise Exception(f"API health check failed: {response.status}")
                logger.info("✅ API health check passed")
            except Exception as e:
                logger.error(f"❌ API not accessible: {e}")
                return {'error': f'API not accessible: {e}'}
        
        # Run concurrent uploads
        start_time = time.time()
        
        async with aiohttp.ClientSession(
            timeout=aiohttp.ClientTimeout(total=600),
            connector=aiohttp.TCPConnector(limit=200, limit_per_host=100)
        ) as session:
            
            tasks = [
                self.upload_file(session, file_data, i) 
                for i in range(num_concurrent)
            ]
            
            logger.info(f"📊 Launching {num_concurrent} concurrent upload tasks...")
            results = await asyncio.gather(*tasks, return_exceptions=True)
        
        total_time = time.time() - start_time
        
        # Process results
        successful_results = [r for r in results if isinstance(r, dict) and r.get('success')]
        
        if successful_results:
            self.upload_times = [r['upload_time'] for r in successful_results]
            self.processing_times = [r['processing_time'] for r in successful_results if 'processing_time' in r]
            self.end_to_end_times = [r['end_to_end_time'] for r in successful_results if 'end_to_end_time' in r]
        
        return self.generate_report(total_time, num_concurrent)
    
    def generate_report(self, total_time: float, num_concurrent: int) -> Dict[str, Any]:
        """Generate comprehensive performance report"""
        
        report = {
            'test_summary': {
                'total_requests': num_concurrent,
                'successful_requests': self.success_count,
                'failed_requests': self.error_count,
                'success_rate': f"{(self.success_count / num_concurrent * 100):.1f}%",
                'total_test_duration': f"{total_time:.2f}s"
            },
            'api_response_metrics': {},
            'processing_metrics': {},
            'cost_estimate': {}
        }
        
        # API Response Metrics
        if self.upload_times:
            report['api_response_metrics'] = {
                'average_response_time': f"{statistics.mean(self.upload_times):.3f}s",
                'median_response_time': f"{statistics.median(self.upload_times):.3f}s",
                'p95_latency': f"{self.percentile(self.upload_times, 95):.3f}s",
                'p99_latency': f"{self.percentile(self.upload_times, 99):.3f}s",
                'min_response_time': f"{min(self.upload_times):.3f}s",
                'max_response_time': f"{max(self.upload_times):.3f}s"
            }
        
        # Processing Metrics
        if self.end_to_end_times:
            report['processing_metrics'] = {
                'average_end_to_end_time': f"{statistics.mean(self.end_to_end_times):.1f}s",
                'median_end_to_end_time': f"{statistics.median(self.end_to_end_times):.1f}s",
                'p95_end_to_end_time': f"{self.percentile(self.end_to_end_times, 95):.1f}s",
                'p99_end_to_end_time': f"{self.percentile(self.end_to_end_times, 99):.1f}s"
            }
        
        # Cost Estimate (based on Google Cloud pricing)
        avg_processing_time = statistics.mean(self.end_to_end_times) if self.end_to_end_times else 60
        report['cost_estimate'] = self.calculate_cost_estimate(avg_processing_time)
        
        return report
    
    @staticmethod
    def percentile(data: List[float], percentile: int) -> float:
        """Calculate percentile"""
        if not data:
            return 0
        sorted_data = sorted(data)
        index = int(len(sorted_data) * percentile / 100)
        return sorted_data[min(index, len(sorted_data) - 1)]
    
    @staticmethod
    def calculate_cost_estimate(avg_processing_time: float) -> Dict[str, str]:
        """Calculate cost estimate for 1000 jobs"""
        
        # Cloud Run pricing (us-central1)
        cpu_price_per_vcpu_second = 0.00002400
        memory_price_per_gb_second = 0.00000250
        request_price = 0.0000004
        
        # Service configuration
        api_cpu = 1
        api_memory = 2
        worker_cpu = 2
        worker_memory = 2
        
        # Estimate resource usage per job
        api_cpu_seconds = 2  # API processing
        api_memory_seconds = 2
        worker_cpu_seconds = avg_processing_time
        worker_memory_seconds = avg_processing_time
        
        # Calculate costs for 1000 jobs
        jobs = 1000
        
        api_cpu_cost = jobs * api_cpu_seconds * api_cpu * cpu_price_per_vcpu_second
        api_memory_cost = jobs * api_memory_seconds * api_memory * memory_price_per_gb_second
        worker_cpu_cost = jobs * worker_cpu_seconds * worker_cpu * cpu_price_per_vcpu_second
        worker_memory_cost = jobs * worker_memory_seconds * worker_memory * memory_price_per_gb_second
        request_cost = jobs * request_price
        
        # OpenAI API cost (Whisper: $0.006 per minute)
        avg_audio_minutes = 5
        openai_cost = jobs * avg_audio_minutes * 0.006
        
        # Gemini API cost (estimate $0.001 per request)
        gemini_cost = jobs * 0.001
        
        # Redis cost (minimal for job storage)
        redis_cost = 0.50  # Monthly cost prorated
        
        total_cost = (api_cpu_cost + api_memory_cost + worker_cpu_cost + 
                     worker_memory_cost + request_cost + openai_cost + 
                     gemini_cost + redis_cost)
        
        return {
            'total_cost_1000_jobs': f"${total_cost:.2f}",
            'cost_per_job': f"${total_cost/1000:.4f}",
            'breakdown': {
                'cloud_run_api': f"${api_cpu_cost + api_memory_cost:.2f}",
                'cloud_run_workers': f"${worker_cpu_cost + worker_memory_cost:.2f}",
                'openai_whisper': f"${openai_cost:.2f}",
                'gemini_analysis': f"${gemini_cost:.2f}",
                'redis_storage': f"${redis_cost:.2f}",
                'requests': f"${request_cost:.2f}"
            }
        }

async def main():
    """Main function to run performance test"""
    
    # Get base URL from environment or default
    import os
    base_url = os.getenv('API_BASE_URL', 'http://localhost:8000')
    
    print(f"🎯 Performance Testing Cloud-Native Transcription Service")
    print(f"🌐 Target URL: {base_url}")
    print(f"📊 Test Configuration: 100 concurrent uploads, 5-minute audio files")
    print("=" * 80)
    
    tester = PerformanceTest(base_url)
    
    try:
        results = await tester.run_concurrent_test(100)
        
        if 'error' in results:
            print(f"❌ Test failed: {results['error']}")
            return
        
        # Print detailed report
        print("\n📈 PERFORMANCE REPORT")
        print("=" * 80)
        
        print("\n🎯 TEST SUMMARY:")
        for key, value in results['test_summary'].items():
            print(f"  {key.replace('_', ' ').title()}: {value}")
        
        if results['api_response_metrics']:
            print("\n⚡ API RESPONSE METRICS:")
            for key, value in results['api_response_metrics'].items():
                print(f"  {key.replace('_', ' ').title()}: {value}")
        
        if results['processing_metrics']:
            print("\n🔄 PROCESSING METRICS:")
            for key, value in results['processing_metrics'].items():
                print(f"  {key.replace('_', ' ').title()}: {value}")
        
        print("\n💰 COST ESTIMATE (1000 jobs):")
        print(f"  Total Cost: {results['cost_estimate']['total_cost_1000_jobs']}")
        print(f"  Cost Per Job: {results['cost_estimate']['cost_per_job']}")
        
        print("\n  Cost Breakdown:")
        for component, cost in results['cost_estimate']['breakdown'].items():
            print(f"    {component.replace('_', ' ').title()}: {cost}")
        
        # Save detailed JSON report
        with open('performance_report.json', 'w') as f:
            json.dump(results, f, indent=2)
        
        print(f"\n📄 Detailed report saved to: performance_report.json")
        print("=" * 80)
        print("✅ Performance testing complete!")
        
    except KeyboardInterrupt:
        print("\n🛑 Test interrupted by user")
    except Exception as e:
        print(f"❌ Test failed with error: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    asyncio.run(main())