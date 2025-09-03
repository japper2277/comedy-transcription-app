import os
import requests
import logging

logger = logging.getLogger(__name__)

class GeminiClient:
    def __init__(self, api_key=None):
        # Get API key from parameter or environment
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        
        # Enable mock mode if no API key
        self.mock_mode = not self.api_key
        
        if not self.mock_mode:
            self.api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
        
    def transcribe_audio(self, file_path: str) -> str:
        """
        Transcribe audio file using Gemini Flash 2.0 (if it supports audio)
        Note: This is a placeholder - Gemini primarily does text analysis
        """
        # For now, Gemini Flash 2.0 is primarily for text analysis
        # We'll use it for post-processing Whisper transcripts
        raise NotImplementedError("Gemini Flash 2.0 is used for text analysis, not direct audio transcription")
    
    def analyze_comedy_performance(self, transcript: str, set_list: str = "", custom_prompt: str = "") -> dict:
        """
        Alias for analyze_transcript for compatibility
        """
        return self.analyze_transcript(transcript, set_list, custom_prompt)
    
    def analyze_transcript(self, transcript: str, set_list: str = "", custom_prompt: str = "") -> dict:
        """
        Analyze transcript using Gemini Flash 2.0 for comedy analysis
        """
        logger.info("GEMINI DEBUG - Starting analysis")
        logger.info(f"   Transcript length: {len(transcript)} chars")
        logger.info(f"   Set list length: {len(set_list)} chars")
        logger.info(f"   Mock mode: {'YES' if self.mock_mode else 'NO'}")
        
        # Mock mode analysis
        if self.mock_mode:
            import time
            time.sleep(1)  # Simulate processing time
            mock_analysis = f"""[MOCK GEMINI ANALYSIS]

**Joke: Opening Bit**
{transcript[:100]}...

**NEW BIT: Performance Test**
This is a simulated analysis of your comedy performance. The Gemini integration is working correctly!

**Riff**
In production, this would be real AI-powered comedy analysis using Google's Gemini 2.0 Flash model.

Analysis Features:
- Joke identification and categorization
- Set list matching
- New bit discovery  
- Performance insights
- Comedy structure analysis

Set List Provided: {"Yes" if set_list.strip() else "No"}
Custom Prompt: {"Yes" if custom_prompt.strip() else "No"}"""
            return {"success": True, "analysis": mock_analysis}
        
        try:
            # Default comedy analysis prompt
            default_prompt = """You are a professional comedy show organizer. Analyze this transcript and perform the following tasks:

1. Match COMPLETE segments of the transcript to these bits from the provided set list:
{set_list_text}
Label these matched segments as '**Joke: [Matched Set List Title]**'.

2. Identify any other COMPLETE structured comedy bits in the transcript that aren't in the set list, and for each one, generate a concise descriptive title (3–5 words) based on its content, then label the segment as '**NEW BIT: [Descriptive Title]**'.

3. For any short, unrelated comments or brief audience interactions that are not part of a structured joke or new bit, label them as '**Riff**'.

CRITICAL LABELING RULES:
- Label ENTIRE comedy bits from setup to punchline - do NOT cut jokes in the middle
- When you identify a joke or bit, include the COMPLETE segment including setup, development, and punchline
- Place labels at the very beginning of each complete segment
- Do NOT break up or interrupt the flow of individual jokes with multiple labels

Formatting Requirements:
- IMPORTANT: You MUST return the *entire original transcript text* with your labels inserted directly before the relevant segments.
- Do NOT alter or remove any part of the original transcript text itself.
- Maintain the original sequence of the transcript.
- Add line breaks for better readability - break long paragraphs into shorter, readable chunks
- Do not add any introductory or concluding remarks, only the labeled transcript.

Transcript to analyze:
{transcript}"""

            # Use custom prompt if provided, otherwise use default
            prompt_template = custom_prompt if custom_prompt.strip() else default_prompt
            
            # Format the prompt
            set_list_text = set_list if set_list.strip() else "No set list provided."
            full_prompt = prompt_template.format(set_list_text=set_list_text, transcript=transcript)
            
            # Prepare Gemini API request
            headers = {
                "Content-Type": "application/json"
            }
            
            payload = {
                "contents": [{
                    "parts": [{
                        "text": full_prompt
                    }]
                }]
            }
            
            # Make API call to Gemini
            response = requests.post(
                f"{self.api_url}?key={self.api_key}",
                headers=headers,
                json=payload,
                timeout=60
            )
            
            if response.status_code == 200:
                result = response.json()
                analysis = result["candidates"][0]["content"]["parts"][0]["text"]
                return {"success": True, "analysis": analysis}
            else:
                logger.error(f"Gemini API error: {response.status_code} - {response.text}")
                return {"success": False, "error": f"API Error: {response.status_code}"}
                
        except Exception as e:
            logger.error(f"Gemini analysis error: {str(e)}")
            return {"success": False, "error": str(e)}
    
    def enhanced_transcribe_and_analyze(self, file_path: str, set_list: str = "", custom_prompt: str = "") -> dict:
        """
        This would be used if we want to combine Whisper + Gemini in one step
        For now, it's a placeholder for future enhancement
        """
        return {
            "success": False, 
            "error": "Enhanced transcription not yet implemented. Use separate transcription + analysis steps."
        }