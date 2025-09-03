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

# Whisper model will be loaded on demand to save memory
model = None
logger.info("Whisper model will be loaded on demand")

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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            max-width: 1000px;
            margin: 20px auto;
            padding: 20px;
            line-height: 1.5;
            color: #333;
        }
        
        .container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
        }
        
        @media (min-width: 768px) {
            .container {
                grid-template-columns: 1fr 1fr;
            }
        }
        
        .upload-section {
            grid-column: 1 / -1;
        }
        
        .upload-area {
            border: 2px dashed #ddd;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 20px 0;
            transition: border-color 0.2s ease;
            background: #fafafa;
        }
        
        .upload-area:hover {
            border-color: #4CAF50;
            background: #f5f9f5;
        }
        
        .result {
            margin-top: 20px;
            padding: 24px;
            background: #fff;
            border-radius: 12px;
            border: 1px solid #e0e0e0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            min-height: 120px;
            
            /* Critical text formatting fixes */
            word-wrap: break-word;
            word-break: break-word;
            overflow-wrap: break-word;
            white-space: pre-wrap;
            line-height: 1.7;
            font-size: 14px;
            
            /* Prevent horizontal overflow */
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
            box-sizing: border-box;
        }
        
        .result h3 {
            margin-top: 0;
            margin-bottom: 16px;
            color: #2c3e50;
            border-bottom: 2px solid #eee;
            padding-bottom: 8px;
        }
        
        .result pre {
            margin: 0;
            font-family: inherit;
            font-size: inherit;
            white-space: pre-wrap;
            word-wrap: break-word;
            word-break: break-word;
            overflow-wrap: break-word;
        }
        
        .analysis-content {
            max-height: 600px;
            overflow-y: auto;
            padding-right: 10px;
        }
        
        .analysis-content::-webkit-scrollbar {
            width: 6px;
        }
        
        .analysis-content::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
        }
        
        .analysis-content::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
        }
        
        .loading {
            text-align: center;
            font-style: italic;
            color: #666;
            padding: 40px;
        }
        
        .error {
            color: #d32f2f;
            background: #ffebee;
            border: 1px solid #f44336;
        }
        
        .gemini-options {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 12px;
            margin: 15px 0;
            border: 1px solid #dee2e6;
        }
        
        .gemini-options h3 {
            margin-top: 0;
            color: #495057;
        }
        
        textarea {
            width: 100%;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 12px;
            font-family: inherit;
            font-size: 14px;
            resize: vertical;
            box-sizing: border-box;
        }
        
        textarea:focus {
            outline: none;
            border-color: #4CAF50;
            box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
        }
        
        .checkbox-container {
            margin: 20px 0;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #dee2e6;
        }
        
        .checkbox-container label {
            display: flex;
            align-items: center;
            cursor: pointer;
            font-weight: 500;
        }
        
        .checkbox-container input[type="checkbox"] {
            margin-right: 10px;
            transform: scale(1.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="upload-section">
            <h1>🎤 Comedy Transcription & AI Analysis</h1>
            <p>Upload an audio file to transcribe with Whisper AI and optionally analyze with Gemini Flash 2.0</p>
            
            <!-- Data Processing Consent -->
            <div class="consent-container" style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #856404;">🔒 Data Processing Consent</h3>
                <div style="font-size: 14px; line-height: 1.5; margin-bottom: 15px;">
                    <p><strong>Before uploading your audio:</strong></p>
                    <ul style="margin-left: 20px;">
                        <li>Your audio is processed locally using Whisper AI for transcription</li>
                        <li>If you enable AI analysis, only the TEXT transcript is sent to Google Gemini</li>
                        <li>Audio files are automatically deleted after processing</li>
                        <li>All transfers use encrypted connections (HTTPS)</li>
                    </ul>
                    <p style="margin-bottom: 0;"><small><a href="#" onclick="showPrivacyDetails()" style="color: #007bff;">View detailed privacy information</a></small></p>
                </div>
                <div class="checkbox-container" style="background: none; border: none; padding: 0; margin: 0;">
                    <label style="font-weight: 600;"><input type="checkbox" id="consentCheckbox" required /> I consent to audio processing as described above</label>
                </div>
            </div>

            <div class="upload-area" id="uploadArea" style="opacity: 0.5; pointer-events: none;">
                <input type="file" id="audioFile" accept="audio/*" disabled />
                <p>Choose an audio file (MP3, WAV, M4A, etc.)</p>
                <p><small>📏 Maximum file size: 50MB | Recommended: Under 5 minutes for best results</small></p>
                <p><small style="color: #666;">Please provide consent above to enable file upload</small></p>
            </div>
            
            <div class="checkbox-container" id="geminiContainer" style="opacity: 0.5; pointer-events: none;">
                <label><input type="checkbox" id="enableGemini" disabled /> Enable Gemini AI Analysis</label>
            </div>
            
            <div id="geminiOptions" class="gemini-options" style="display: none;">
                <h3>📝 Analysis Options</h3>
                <div style="margin-bottom: 15px;">
                    <label for="setList">Set List (optional):</label><br>
                    <textarea id="setList" placeholder="Paste your set list here..." rows="3"></textarea>
                </div>
                <div>
                    <label for="customPrompt">Custom Prompt (optional - leave blank to use default):</label><br>
                    <textarea id="customPrompt" placeholder="Enter custom analysis prompt..." rows="4"></textarea>
                </div>
            </div>
        </div>
        
        <div id="result" class="result">
            <p>Your transcription will appear here...</p>
        </div>
        
        <div id="analysis" class="result" style="display: none;">
            <h3>🧠 Gemini AI Analysis</h3>
            <div id="analysisContent" class="analysis-content"></div>
        </div>
    </div>

    <script>
        // Consent management
        document.getElementById('consentCheckbox').addEventListener('change', function() {
            const uploadArea = document.getElementById('uploadArea');
            const audioFile = document.getElementById('audioFile');
            const geminiContainer = document.getElementById('geminiContainer');
            const enableGemini = document.getElementById('enableGemini');
            
            if (this.checked) {
                // Enable upload when consent is given
                uploadArea.style.opacity = '1';
                uploadArea.style.pointerEvents = 'auto';
                audioFile.disabled = false;
                geminiContainer.style.opacity = '1';
                geminiContainer.style.pointerEvents = 'auto';
                enableGemini.disabled = false;
            } else {
                // Disable upload when consent is withdrawn
                uploadArea.style.opacity = '0.5';
                uploadArea.style.pointerEvents = 'none';
                audioFile.disabled = true;
                audioFile.value = ''; // Clear any selected file
                geminiContainer.style.opacity = '0.5';
                geminiContainer.style.pointerEvents = 'none';
                enableGemini.disabled = true;
                enableGemini.checked = false;
                document.getElementById('geminiOptions').style.display = 'none';
            }
        });

        // Privacy details modal
        function showPrivacyDetails() {
            alert(`DETAILED PRIVACY INFORMATION

Data Processing:
• Audio files are processed locally using OpenAI Whisper technology
• Audio files are temporarily stored and automatically deleted after transcription
• No audio data is sent to external services for transcription

Optional AI Analysis:
• If enabled, only TEXT transcripts are sent to Google Gemini API
• Google processes text for comedy analysis and set list matching  
• Text processing follows Google's privacy policy and data retention rules

Your Rights:
• You can request deletion of any stored data
• You can withdraw consent at any time
• You maintain all rights to your original content

Security:
• All data transfers use HTTPS encryption
• No long-term storage of audio or transcript data
• Access is limited to essential processing only

Contact: For privacy questions or data deletion requests, contact support.`);
        }

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
    
    # Check file size (limit to 50MB to prevent memory issues)
    content = await file.read()
    file_size_mb = len(content) / (1024 * 1024)
    
    if file_size_mb > 50:
        raise HTTPException(
            status_code=400, 
            detail=f"File too large ({file_size_mb:.1f}MB). Please upload files smaller than 50MB for better reliability."
        )
    
    logger.info(f"Processing {file_size_mb:.1f}MB audio file: {file.filename}")
    
    try:
        # Save uploaded file to temporary location (content already read above)
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
            temp_file.write(content)
            temp_file_path = temp_file.name
        
        logger.info(f"Processing audio file: {file.filename}")
        
        # Transcribe with Whisper
        try:
            global model
            if model is None:
                logger.info("Loading Whisper tiny model...")
                model = whisper.load_model("tiny")
                logger.info("Whisper model loaded successfully")
            
            whisper_result = model.transcribe(temp_file_path)
            transcript_text = whisper_result["text"].strip()
        except Exception as whisper_error:
            logger.error(f"Whisper transcription failed for {file.filename}: {whisper_error}")
            # Clean up temp file
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
            
            # Check for specific memory errors
            error_msg = str(whisper_error)
            if "paging file" in error_msg or "memory" in error_msg.lower():
                raise HTTPException(
                    status_code=413,
                    detail=f"Audio file too large for processing. Please try with a shorter audio file (under 5 minutes recommended)."
                )
            else:
                raise HTTPException(
                    status_code=500,
                    detail=f"Audio transcription failed. Please try with a different audio format or shorter file."
                )
        
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
    