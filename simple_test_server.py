#!/usr/bin/env python3
"""Simple test server for Gemini analysis"""

from fastapi import FastAPI, UploadFile, File, Form
import os
import google.generativeai as genai
import uuid
import tempfile

# Set environment
os.environ['GEMINI_API_KEY'] = 'AIzaSyAup3uRbE2dJAT2DsMyMGwP9cPG9wOUaxU'

app = FastAPI(title="Gemini Test Server")

@app.post("/analyze")
async def analyze_text(file: UploadFile = File(...)):
    """Analyze uploaded text file with Gemini"""
    
    # Read file content
    content = await file.read()
    text = content.decode('utf-8')
    
    # Configure Gemini
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    model = genai.GenerativeModel('gemini-2.0-flash-exp')
    
    prompt = f"""Analyze this comedy performance transcript and provide detailed feedback:

Transcript: {text}

Please provide analysis covering:
1. Timing and delivery
2. Joke structure and setup/punchline effectiveness  
3. Audience engagement and response
4. Areas for improvement
5. Overall performance assessment"""
    
    response = model.generate_content(prompt)
    
    return {
        "job_id": str(uuid.uuid4()),
        "status": "completed",
        "analysis": response.text,
        "analysis_length": len(response.text)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8002)