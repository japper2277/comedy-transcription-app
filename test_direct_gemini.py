#!/usr/bin/env python3
"""Direct test of Gemini analysis without FastAPI"""

import os
import sys
sys.path.append('backend')

# Set environment
os.environ['GEMINI_API_KEY'] = 'AIzaSyAup3uRbE2dJAT2DsMyMGwP9cPG9wOUaxU'

import google.generativeai as genai

def test_gemini_analysis():
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    model = genai.GenerativeModel('gemini-2.0-flash-exp')
    
    # Read test content
    with open('test_audio.txt', 'r') as f:
        content = f.read()
    
    prompt = f"""Analyze this comedy performance transcript and provide detailed feedback:

Transcript: {content}

Please provide analysis covering:
1. Timing and delivery
2. Joke structure and setup/punchline effectiveness  
3. Audience engagement and response
4. Areas for improvement
5. Overall performance assessment"""
    
    response = model.generate_content(prompt)
    
    print("SUCCESS!")
    print(f"Analysis length: {len(response.text)} characters")
    print("First 300 characters:")
    print(response.text[:300])
    return response.text

if __name__ == "__main__":
    result = test_gemini_analysis()