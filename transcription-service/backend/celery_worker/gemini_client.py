import os
import logging

logger = logging.getLogger(__name__)

class GeminiClient:
    def __init__(self, api_key=None):
        # Get API key from parameter or environment
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        
        # Enable mock mode if no API key
        self.mock_mode = not self.api_key
        
        if not self.mock_mode:
            # Using google-generativeai library instead of direct HTTP requests
            pass
        
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
            # Use the same google-generativeai library as main.py for consistency
            import google.generativeai as genai
            genai.configure(api_key=self.api_key)
            
            model_client = genai.GenerativeModel('gemini-2.0-flash-exp')
            
            # Use the same prompt structure as main.py
            prompt_instruction = "You are a professional comedy show organizer. Analyze this transcript and perform the following tasks:\n"
            if set_list and set_list.strip():
                prompt_instruction += f"1. Match segments of the transcript to these bits from the provided set list:\n{set_list}\n   Label these matched segments as '**Joke: [Matched Set List Title]**'.\n"
                prompt_instruction += "2. Identify any other structured comedy bits in the transcript that aren't in the set list, and for each one, generate a concise descriptive title (3–5 words) based on its content, then label the segment as **NEW BIT: [Descriptive Title]**.\n"
                prompt_instruction += "3. For any short, unrelated comments or brief audience interactions that are not part of a structured joke or new bit, label them as '**Riff**'.\n"
            else:
                prompt_instruction += "1. Identify structured comedy bits in the transcript, and for each one, generate a concise descriptive title (3–5 words) based on its content, then label the segment as **NEW BIT: [Descriptive Title]**.\n"
                prompt_instruction += "2. For any short, unrelated comments or brief audience interactions that are not part of a structured joke or new bit, label them as '**Riff**'.\n"

            prompt_instruction += """
Formatting Requirements:
- IMPORTANT: You MUST return the *entire original transcript text* with your labels inserted directly before the relevant segments.
- Do NOT alter or remove any part of the original transcript text itself.
- Maintain the original sequence of the transcript.
- Do not add any introductory or concluding remarks, only the labeled transcript.
"""

            prompt = f"{prompt_instruction}\n\nTranscript to analyze:\n{transcript}"
            
            # Use custom prompt if provided
            if custom_prompt and custom_prompt.strip():
                prompt = custom_prompt.format(transcript=transcript, set_list=set_list)
            
            response = model_client.generate_content(prompt, request_options={"timeout": 60})
            analysis = response.text
            
            return {"success": True, "analysis": analysis}
                
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