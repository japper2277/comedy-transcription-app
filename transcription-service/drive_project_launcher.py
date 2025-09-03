#!/usr/bin/env python3
"""
Google Drive Project Launcher
Run your transcription service directly from Google Drive storage
"""

import os
import sys
import json
import subprocess
import tempfile
import shutil
from pathlib import Path

# Add the backend API to the path
sys.path.append(str(Path(__file__).parent / "backend"))

from backend.api.google_drive_client import GoogleDriveClient
from backend.api.logging_config import get_logger
from drive_sync_utility import DriveProjectSyncer

logger = get_logger("drive_launcher")

class DriveProjectLauncher:
    def __init__(self):
        """Initialize Drive project launcher"""
        self.project_root = Path(__file__).parent.parent
        self.credentials_path = self.project_root / "google-oauth-credentials.json"
        self.temp_workspace = None
        self.syncer = DriveProjectSyncer()
        
        logger.info("Drive Project Launcher initialized")
    
    def launch_transcription_service(self, sync_changes=True):
        """Launch transcription service from Google Drive"""
        try:
            # Create temporary workspace
            self.temp_workspace = Path(tempfile.mkdtemp(prefix="drive_project_"))
            logger.info(f"Created temporary workspace: {self.temp_workspace}")
            
            # Download project from Drive
            logger.info("Downloading project from Google Drive...")
            project_dir = self.syncer.download_project_from_drive(self.temp_workspace / "project")
            project_path = Path(project_dir)
            
            # Find transcription service directory
            transcription_service_path = project_path / "transcription-service"
            if not transcription_service_path.exists():
                raise FileNotFoundError("Transcription service directory not found in Drive project")
            
            # Install dependencies
            logger.info("Installing Python dependencies...")
            self._install_dependencies(transcription_service_path)
            
            # Start services
            logger.info("Starting transcription service...")
            backend_process = self._start_backend(transcription_service_path)
            frontend_process = self._start_frontend(transcription_service_path)
            
            # Monitor and sync changes
            if sync_changes:
                logger.info("Monitoring for changes and syncing to Drive...")
                self._monitor_and_sync(project_path, [backend_process, frontend_process])
            else:
                self._wait_for_processes([backend_process, frontend_process])
            
        except KeyboardInterrupt:
            logger.info("Shutting down services...")
        except Exception as e:
            logger.error(f"Failed to launch project: {e}")
            raise
        finally:
            # Cleanup
            self._cleanup()
    
    def launch_development_environment(self):
        """Set up development environment with Google Drive sync"""
        try:
            # Create persistent workspace
            workspace_path = self.project_root / "drive_dev_workspace"
            workspace_path.mkdir(exist_ok=True)
            
            logger.info(f"Setting up development workspace: {workspace_path}")
            
            # Download project
            project_dir = self.syncer.download_project_from_drive(workspace_path)
            project_path = Path(project_dir)
            
            # Install dependencies
            transcription_service_path = project_path / "transcription-service"
            if transcription_service_path.exists():
                logger.info("Installing dependencies...")
                self._install_dependencies(transcription_service_path)
            
            logger.info("=" * 60)
            logger.info("DEVELOPMENT ENVIRONMENT READY!")
            logger.info(f"Project location: {project_path}")
            logger.info("")
            logger.info("To start development:")
            logger.info(f"1. Open your IDE/editor in: {project_path}")
            logger.info("2. Edit files normally")
            logger.info("3. Run sync to upload changes:")
            logger.info(f"   python drive_sync_utility.py upload --dir {project_path}")
            logger.info("")
            logger.info("Or watch for auto-sync:")
            logger.info(f"   python drive_sync_utility.py watch --dir {project_path}")
            logger.info("=" * 60)
            
            return str(project_path)
            
        except Exception as e:
            logger.error(f"Failed to setup development environment: {e}")
            raise
    
    def _install_dependencies(self, service_path):
        """Install Python and Node.js dependencies"""
        backend_path = service_path / "backend"
        frontend_path = service_path / "frontend"
        
        # Install Python dependencies
        if (backend_path / "requirements.txt").exists():
            logger.info("Installing Python dependencies...")
            subprocess.run([
                sys.executable, "-m", "pip", "install", "-r", 
                str(backend_path / "requirements.txt")
            ], check=True, cwd=backend_path)
        
        # Install Node.js dependencies
        if (frontend_path / "package.json").exists():
            logger.info("Installing Node.js dependencies...")
            subprocess.run(["npm", "install"], check=True, cwd=frontend_path)
    
    def _start_backend(self, service_path):
        """Start backend service"""
        backend_path = service_path / "backend"
        
        # Set environment variables
        env = os.environ.copy()
        env_file = backend_path / ".env"
        if env_file.exists():
            with open(env_file, 'r') as f:
                for line in f:
                    if '=' in line and not line.strip().startswith('#'):
                        key, value = line.strip().split('=', 1)
                        env[key] = value
        
        # Start uvicorn server
        cmd = [
            sys.executable, "-m", "uvicorn", 
            "api.main:app", 
            "--reload", 
            "--host", "0.0.0.0", 
            "--port", "8000"
        ]
        
        logger.info(f"Starting backend: {' '.join(cmd)}")
        process = subprocess.Popen(
            cmd,
            cwd=backend_path,
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=True
        )
        
        return process
    
    def _start_frontend(self, service_path):
        """Start frontend service"""
        frontend_path = service_path / "frontend"
        
        if not frontend_path.exists():
            logger.warning("Frontend directory not found, skipping")
            return None
        
        # Start Vite dev server
        cmd = ["npm", "run", "dev"]
        
        logger.info(f"Starting frontend: {' '.join(cmd)}")
        process = subprocess.Popen(
            cmd,
            cwd=frontend_path,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=True
        )
        
        return process
    
    def _monitor_and_sync(self, project_path, processes):
        """Monitor processes and sync changes"""
        import time
        
        try:
            while any(p.poll() is None for p in processes if p):
                # Check for local changes and sync
                modified_files = self.syncer._find_modified_files(project_path)
                if modified_files:
                    logger.info(f"Detected {len(modified_files)} changes, syncing to Drive...")
                    self.syncer.upload_changes_to_drive(project_path)
                
                time.sleep(10)  # Check every 10 seconds
                
        except KeyboardInterrupt:
            pass
        finally:
            # Stop all processes
            for process in processes:
                if process and process.poll() is None:
                    process.terminate()
                    try:
                        process.wait(timeout=5)
                    except subprocess.TimeoutExpired:
                        process.kill()
    
    def _wait_for_processes(self, processes):
        """Wait for processes to complete"""
        try:
            for process in processes:
                if process:
                    process.wait()
        except KeyboardInterrupt:
            for process in processes:
                if process and process.poll() is None:
                    process.terminate()
    
    def _cleanup(self):
        """Clean up temporary files"""
        if self.temp_workspace and self.temp_workspace.exists():
            logger.info(f"Cleaning up workspace: {self.temp_workspace}")
            shutil.rmtree(self.temp_workspace, ignore_errors=True)

def main():
    """Main CLI interface"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Launch project from Google Drive")
    parser.add_argument("mode", choices=["run", "dev"], 
                       help="Launch mode: 'run' for temporary execution, 'dev' for development setup")
    parser.add_argument("--no-sync", action="store_true", 
                       help="Disable automatic sync in run mode")
    
    args = parser.parse_args()
    
    try:
        launcher = DriveProjectLauncher()
        
        if args.mode == "run":
            launcher.launch_transcription_service(sync_changes=not args.no_sync)
            
        elif args.mode == "dev":
            workspace_path = launcher.launch_development_environment()
            print(f"Development environment ready at: {workspace_path}")
            
    except Exception as e:
        logger.error(f"Launch failed: {e}")
        print(f"FAILED: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()