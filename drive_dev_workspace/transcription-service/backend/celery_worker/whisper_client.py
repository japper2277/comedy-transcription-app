import openai
import os

class WhisperClient:
    def __init__(self, api_key=None):
        # Get API key from parameter or environment
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        
        if not self.api_key:
            raise ValueError("OpenAI API key is required")
            
        self.client = openai.OpenAI(
            api_key=self.api_key,
            timeout=30.0
        )
    
    def transcribe_audio(self, file_path: str) -> str:
        """
        Transcribe audio file using OpenAI Whisper API
        """
        try:
            with open(file_path, "rb") as audio_file:
                transcript = self.client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file,
                    response_format="text"
                )
                return transcript
                
        except Exception as e:
            raise Exception(f"Whisper transcription failed: {str(e)}")
    
    def transcribe_audio_detailed(self, file_path: str) -> dict:
        """
        Transcribe with detailed response including timestamps
        """
        try:
            with open(file_path, "rb") as audio_file:
                transcript = self.client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file,
                    response_format="verbose_json",
                    timestamp_granularities=["word"]
                )
                return {
                    "text": transcript.text,
                    "duration": transcript.duration,
                    "words": transcript.words if hasattr(transcript, 'words') else None
                }
                
        except Exception as e:
            raise Exception(f"Whisper detailed transcription failed: {str(e)}")