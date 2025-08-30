from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.responses import HTMLResponse
import logging
import whisper
import tempfile
import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(title="Comedy Transcription API")

# Load Whisper model
logger.info("Loading Whisper tiny model...")
model = whisper.load_model("tiny")
logger.info("Whisper model loaded successfully")

# Load Gemini API key from environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    logger.error("GEMINI_API_KEY not found in environment variables!")
    raise ValueError("Please set GEMINI_API_KEY in your .env file")
# Gemini API endpoint configuration
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

# Default prompt template - easily customizable
DEFAULT_PROMPT_TEMPLATE = """You are a professional comedy show organizer. Analyze this transcript and perform the following tasks:

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

def format_transcript_for_display(transcript: str) -> str:
    """Format transcript for better readability"""
    # Add breaks after sentences and clean up spacing
    import re
    
    # Replace multiple spaces with single spaces
    formatted = re.sub(r' +', ' ', transcript)
    
    # Add line breaks after sentences (but not interrupting mid-word)
    formatted = re.sub(r'([.!?])\s+', r'\1\n\n', formatted)
    
    # Add breaks after longer phrases without punctuation
    formatted = re.sub(r'([^.!?]{100,}?)\s+', r'\1\n', formatted)
    
    return formatted.strip()

async def analyze_with_gemini(transcript: str, set_list: str = "", custom_prompt: str = ""):
    """Analyze transcript using Gemini Flash 2.0"""
    try:
        # Use custom prompt if provided, otherwise use default
        prompt_template = custom_prompt if custom_prompt.strip() else DEFAULT_PROMPT_TEMPLATE
        
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
            f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
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

# Serve static files
@app.get("/")
async def root():
    """Serve the main transcription interface"""
    html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comedy Transcription Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        .upload-area {
            border: 2px dashed #ccc;
            border-radius: 10px;
            padding: 40px;
            text-align: center;
            margin: 20px 0;
        }
        .upload-area:hover {
            border-color: #999;
        }
        .result {
            margin-top: 30px;
            padding: 20px;
            background: #f5f5f5;
            border-radius: 5px;
            white-space: pre-wrap;
            word-wrap: break-word;
            line-height: 1.6;
            max-width: 100%;
            max-height: 500px;
            min-height: 100px;
            overflow-y: auto;
            overflow-x: hidden;
            border: 1px solid #ddd;
            box-sizing: border-box;
        }
        .loading {
            text-align: center;
            font-style: italic;
            color: #666;
        }
        .error {
            color: red;
            background: #ffe6e6;
        }
    </style>
</head>
<body>
    <h1>🎤 Comedy Transcription & Analysis</h1>
    <p>Upload an audio file to transcribe with Whisper AI and optionally analyze with Gemini Flash 2.0</p>
    
    <div class="upload-area">
        <input type="file" id="audioFile" accept="audio/*" />
        <p>Choose an audio file (MP3, WAV, M4A, etc.)</p>
    </div>
    
    <div style="margin: 20px 0;">
        <label><input type="checkbox" id="enableGemini" /> Enable Gemini Analysis</label>
    </div>
    
    <div id="geminiOptions" style="display: none; background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 10px 0;">
        <h3>📝 Analysis Options</h3>
        <div>
            <label for="setList">Set List (optional):</label><br>
            <textarea id="setList" placeholder="Paste your set list here..." rows="3" style="width: 100%; margin: 5px 0;"></textarea>
        </div>
        <div>
            <label for="customPrompt">Custom Prompt (optional - leave blank to use default):</label><br>
            <textarea id="customPrompt" placeholder="Enter custom analysis prompt..." rows="4" style="width: 100%; margin: 5px 0;"></textarea>
        </div>
    </div>
    
    <div id="result" class="result">
        <p>Your transcription will appear here...</p>
    </div>
    
    <div id="analysis" class="result" style="display: none;">
        <h3>🧠 Gemini Analysis</h3>
        <div id="analysisContent"></div>
    </div>

    <script>
        // Toggle Gemini options visibility
        document.getElementById('enableGemini').addEventListener('change', function() {
            const geminiOptions = document.getElementById('geminiOptions');
            geminiOptions.style.display = this.checked ? 'block' : 'none';
        });

        document.getElementById('audioFile').addEventListener('change', async function(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const resultDiv = document.getElementById('result');
            const analysisDiv = document.getElementById('analysis');
            const analysisContent = document.getElementById('analysisContent');
            
            // Hide analysis section initially
            analysisDiv.style.display = 'none';
            
            resultDiv.className = 'result loading';
            resultDiv.textContent = 'Transcribing audio... This may take a minute.';
            
            const formData = new FormData();
            formData.append('file', file);
            
            // Add Gemini analysis options if enabled
            const enableGemini = document.getElementById('enableGemini').checked;
            if (enableGemini) {
                formData.append('enable_analysis', 'true');
                formData.append('set_list', document.getElementById('setList').value);
                formData.append('custom_prompt', document.getElementById('customPrompt').value);
            }
            
            try {
                const response = await fetch('/api/transcribe', {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                
                // Display transcription
                resultDiv.className = 'result';
                resultDiv.innerHTML = `<h3>📝 Transcription</h3><pre>${result.transcription || 'No transcription available'}</pre>`;
                
                // Display analysis if available
                if (result.analysis) {
                    analysisDiv.style.display = 'block';
                    if (result.analysis.success) {
                        analysisContent.innerHTML = `<pre>${result.analysis.analysis}</pre>`;
                    } else {
                        analysisContent.innerHTML = `<p class="error">Analysis failed: ${result.analysis.error}</p>`;
                    }
                }
                
            } catch (error) {
                resultDiv.className = 'result error';
                resultDiv.textContent = `Error: ${error.message}`;
            }
        });
    </script>
</body>
</html>
    """
    return HTMLResponse(content=html_content)

@app.get("/favicon.ico")
async def favicon():
    """Serve favicon to prevent 404s"""
    return {"message": "No favicon"}

@app.get("/api/status")
async def api_status():
    """API status endpoint"""
    logger.info("API status endpoint accessed")
    return {"message": "Comedy Transcription API", "status": "running"}

@app.post("/api/transcribe")
async def transcribe_audio(
    file: UploadFile = File(...),
    enable_analysis: str = Form("false"),
    set_list: str = Form(""),
    custom_prompt: str = Form("")
):
    """Transcribe audio using OpenAI Whisper and optionally analyze with Gemini Flash 2.0"""
    logger.info(f"Transcribe endpoint accessed with file: {file.filename}, analysis: {enable_analysis}")
    
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    try:
        # Save uploaded file to temporary location
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name
        
        logger.info(f"Processing audio file: {file.filename}")
        
        # Transcribe with Whisper
        whisper_result = model.transcribe(temp_file_path)
        transcript_text = whisper_result["text"].strip()
        
        # Format transcript for better display
        formatted_transcript = format_transcript_for_display(transcript_text)
        
        # Clean up temporary file
        os.unlink(temp_file_path)
        
        logger.info(f"Transcription completed for: {file.filename}")
        
        # Prepare response
        response_data = {
            "filename": file.filename,
            "transcription": formatted_transcript,
            "language": whisper_result["language"],
            "success": True
        }
        
        # Run Gemini analysis if requested
        if enable_analysis.lower() == "true":
            logger.info("Running Gemini analysis...")
            analysis_result = await analyze_with_gemini(
                transcript=transcript_text,
                set_list=set_list,
                custom_prompt=custom_prompt
            )
            response_data["analysis"] = analysis_result
            logger.info(f"Gemini analysis completed: {analysis_result['success']}")
        
        return response_data
        
    except Exception as e:
        logger.error(f"Error processing {file.filename}: {str(e)}")
        
        # Clean up temp file if it exists
        if 'temp_file_path' in locals() and os.path.exists(temp_file_path):
            os.unlink(temp_file_path)
            
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

@app.get("/api/prompt")
async def get_default_prompt():
    """Get the current default prompt template"""
    return {"prompt": DEFAULT_PROMPT_TEMPLATE}

@app.post("/api/prompt")  
async def update_default_prompt(new_prompt: str = Form(...)):
    """Update the default prompt template"""
    global DEFAULT_PROMPT_TEMPLATE
    DEFAULT_PROMPT_TEMPLATE = new_prompt
    logger.info("Default prompt template updated")
    return {"message": "Prompt updated successfully", "prompt": DEFAULT_PROMPT_TEMPLATE}