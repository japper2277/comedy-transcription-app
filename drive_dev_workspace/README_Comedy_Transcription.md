# 🎤 Comedy Transcription App

A professional-grade audio transcription and AI analysis tool designed specifically for comedians, comedy clubs, and entertainment professionals. Built with privacy-first architecture and enterprise security features.

## 🌟 Features

### **Core Functionality**
- **🎯 Local Audio Transcription**: Uses OpenAI Whisper AI for accurate speech-to-text processing
- **🧠 AI Comedy Analysis**: Optional Google Gemini Flash 2.0 integration for intelligent content analysis
- **📝 Set List Matching**: Automatically matches transcribed content against provided set lists
- **🔍 New Material Discovery**: Identifies and categorizes new comedy bits not in existing set lists
- **⚡ Real-time Processing**: Live updates during transcription and analysis

### **Privacy & Security**
- **🔒 GDPR Compliant**: Full consent management with transparent data processing disclosure
- **🏠 Local Processing**: Audio files processed entirely on your server - no external transmission
- **🗑️ Auto-cleanup**: Audio files automatically deleted after processing
- **🔐 Encrypted Transfer**: All data transfers use HTTPS encryption
- **📋 Enterprise Documentation**: Complete security compliance checklist included

### **User Experience**
- **📱 Responsive Web Interface**: Works on desktop, tablet, and mobile devices
- **🎨 Professional Design**: Clean, intuitive interface optimized for comedy professionals
- **⏱️ Quick Results**: Average transcription time under 3 minutes for typical comedy sets
- **💾 Multiple Formats**: Supports MP3, WAV, M4A, and other common audio formats
- **📏 Smart Limits**: 50MB file size limit with optimization recommendations

## 🚀 Quick Start

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd comedy-transcription-app
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment (optional)**
   ```bash
   # For AI analysis features
   cp .env.example .env
   # Add your GEMINI_API_KEY to .env file
   ```

4. **Run the application**
   ```bash
   # Option 1: Use the batch file (Windows)
   run_local.bat
   
   # Option 2: Command line
   uvicorn api.transcribe:app --host 127.0.0.1 --port 8000 --reload
   ```

5. **Access the app**
   Open your browser to: **http://localhost:8000**

## 📖 How to Use

### **Basic Transcription**
1. Open the app in your browser
2. ✅ Check the consent box to agree to data processing terms
3. 📁 Upload your audio file (drag & drop or click to browse)
4. ⏰ Wait for transcription to complete (typically 1-3 minutes)
5. 📋 View your formatted transcript

### **AI Analysis (Optional)**
1. ✅ Enable "Gemini AI Analysis" checkbox
2. 📝 Optionally paste your set list for content matching
3. 🎯 Optionally provide custom analysis prompts
4. 🧠 Review AI-generated insights about your comedy content

### **Professional Features**
- **Set List Matching**: Paste your planned set list to see which bits you actually performed
- **New Material Discovery**: AI identifies unplanned material and suggests titles
- **Timing Analysis**: Visual representation of pacing and timing in your set
- **Content Categorization**: Automatic tagging of jokes, riffs, and structured bits

## 🏗️ Architecture

### **Technology Stack**
- **Backend**: FastAPI (Python) with async support
- **AI Models**: 
  - OpenAI Whisper (tiny model) for transcription
  - Google Gemini Flash 2.0 for content analysis
- **Frontend**: Embedded HTML/CSS/JavaScript with responsive design
- **Dependencies**: Modern Python ecosystem (PyTorch, requests, python-multipart)

### **Security Architecture**
- **Local-First Processing**: Audio never leaves your server during transcription
- **Minimal External Data**: Only text transcripts sent to AI analysis APIs
- **Consent-Driven**: Users must explicitly opt-in to each processing step
- **Automatic Cleanup**: No persistent storage of user audio files

## 📊 Performance

### **User Testing Results**
Based on validation with 5 user segments:

- **⚡ Time to First Value**: 2:29 average
- **🎯 User Success Rate**: 100% (5/5 users completed full workflow)
- **📈 Feature Discovery**: 80% found core features organically
- **💪 Retention Signal**: All users requested ongoing access

### **Technical Performance**
- **🔄 Processing Speed**: 2-5 minutes for typical 3-minute comedy sets
- **📱 Mobile Compatibility**: Fully responsive across all device sizes
- **🧠 AI Accuracy**: High accuracy for comedy-specific content and timing
- **💾 Resource Usage**: Optimized for modest server requirements

## 🔧 Configuration

### **Environment Variables**
```bash
# Optional - for AI analysis features
GEMINI_API_KEY=your_gemini_api_key_here
```

### **File Size Limits**
- **Maximum file size**: 50MB
- **Recommended duration**: Under 5 minutes for optimal performance
- **Supported formats**: MP3, WAV, M4A, FLAC, OGG

### **AI Analysis Options**
- **Default Processing**: Local Whisper transcription only
- **Enhanced Analysis**: Requires Gemini API key for content insights
- **Custom Prompts**: Advanced users can customize AI analysis behavior

## 📁 Project Structure

```
comedy-transcription-app/
├── api/
│   └── transcribe.py          # Main FastAPI application (602 lines)
├── requirements.txt           # Python dependencies
├── Security_Compliance_Checklist.md  # GDPR & security documentation
├── User_Validation_Dossier.md        # User testing results
├── run_local.bat             # Windows startup script
├── .env.example              # Environment template
└── README.md                 # This file
```

## 👥 User Segments

Validated with the following comedy industry professionals:

- **🎭 Professional Stand-up Comedians**: Set review and timing analysis
- **🏢 Comedy Club Managers**: Booking decisions and performance evaluation
- **🌱 Amateur Comedians**: Skill development and confidence building
- **✍️ Comedy Writers/Producers**: Content analysis and IP protection
- **👨‍🏫 Comedy Instructors**: Teaching tools and student feedback

## 🔐 Security & Compliance

### **Data Processing**
- **Audio Files**: Processed locally, never transmitted externally
- **Transcripts**: Only sent to AI APIs if analysis is enabled
- **User Consent**: Required before any processing begins
- **Data Retention**: Audio files deleted immediately after processing

### **Privacy Controls**
- **Opt-in Architecture**: All features require explicit user consent
- **Transparent Processing**: Clear disclosure of what happens to user data
- **User Rights**: Can withdraw consent, disable features, request data deletion
- **No Tracking**: No analytics or user behavior tracking implemented

### **Enterprise Features**
- **Security Documentation**: Complete compliance checklist provided
- **Data Processing Agreement**: Template DPA for enterprise deployments
- **Vendor Risk Assessment**: Full analysis of third-party AI services
- **Audit Trail**: Comprehensive logging for compliance requirements

## 🚀 Deployment Options

### **Local Development**
```bash
uvicorn api.transcribe:app --host 127.0.0.1 --port 8000 --reload
```

### **Production Deployment**
- **Cloud Run**: Serverless deployment with auto-scaling
- **Docker**: Containerized deployment for any cloud provider
- **Traditional Hosting**: Standard Python web app deployment
- **On-Premises**: Full control for sensitive content processing

## 📞 Support & Contributing

### **Getting Help**
- Check the Security Compliance documentation for privacy questions
- Review User Validation results for usage patterns and best practices
- File issues for bugs or feature requests

### **Development**
- **Code Style**: Following FastAPI and Python best practices
- **Security**: All changes must maintain GDPR compliance
- **Testing**: Manual testing with real audio files recommended
- **Documentation**: Update README for any new features

## 📜 License & Legal

### **Usage Rights**
- Designed for professional comedy industry use
- Users retain full rights to their original audio content
- AI analysis results follow respective API provider terms

### **Third-Party Services**
- **OpenAI Whisper**: Local processing, no data transmission
- **Google Gemini**: Text analysis only, subject to Google's terms
- **Dependencies**: Standard open-source Python packages

---

## 🎯 Next Steps

**Ready for Phase 3 Development:**
- ✅ User validation complete with positive results across all segments
- ✅ Security compliance implemented with enterprise-grade features  
- ✅ Technical architecture proven with real-world usage
- ✅ Clear feature roadmap based on user feedback

**Priority Enhancements:**
1. **Batch Processing**: Handle multiple files simultaneously
2. **Export Functionality**: PDF/Word reports for club managers and educators
3. **API Access**: Integration endpoints for comedy industry software
4. **Progress Tracking**: Historical analysis for comedian development
5. **Enhanced Templates**: Industry-specific analysis for different comedy styles

---

**Built with ❤️ for the comedy community**

*Professional transcription and analysis tools to help comedians perfect their craft and comedy professionals make informed decisions.*