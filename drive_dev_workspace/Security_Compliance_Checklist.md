# Part 1: Security & Compliance Checklist
**Comedy Transcription App - Remediation Mandate**  
**Date:** August 31, 2025

---

## A. Vendor Security Review

### Third-Party AI Services Used:

**1. OpenAI Whisper (Local Processing)**
- **Service Type:** Speech-to-text transcription
- **Deployment:** Self-hosted/local model
- **Data Privacy:** Audio files processed entirely locally, no data sent to OpenAI
- **Data Residency:** All processing occurs on local server infrastructure
- **Data Retention:** Audio files temporarily stored during processing, deleted after transcription
- **Security Assessment:** ✅ HIGH - No external data transmission

**2. Google Gemini Flash 2.0 API**
- **Service Type:** AI text analysis and processing
- **Deployment:** Cloud-based API service
- **Data Privacy:** Text transcripts sent to Google's Gemini API for analysis
- **Data Residency:** Data processed in Google Cloud regions (varies by location)
- **Data Retention:** Per Google's API terms - temporary processing, not stored long-term
- **Security Assessment:** ⚠️ MEDIUM - External API requires data transmission

### Key Security Considerations:
- **Local Processing Advantage:** Whisper runs locally, eliminating audio data transmission risks
- **API Dependency:** Gemini analysis requires sending transcript text to Google
- **File Size Limits:** 50MB maximum upload helps prevent abuse
- **Temporary Storage:** Audio files deleted after processing completion

---

## B. Data Processing Addendum (DPA) Template

### STANDARD DATA PROCESSING ADDENDUM
**For Third-Party AI Processing Services**

#### 1. DATA PROCESSING DETAILS
**Data Controller:** [Your Organization Name]  
**Data Processor:** Google LLC (Gemini API)  
**Processing Purpose:** Comedy transcript analysis and content categorization  
**Data Categories:** Text transcriptions of audio recordings  
**Data Subjects:** Comedy performers and content creators  

#### 2. PROCESSING OBLIGATIONS
The Processor agrees to:
- Process personal data only on documented instructions from the Controller
- Ensure persons authorized to process data are committed to confidentiality
- Implement appropriate technical and organizational measures for data security
- Delete or return all personal data after the end of processing services

#### 3. TECHNICAL AND ORGANIZATIONAL MEASURES
- **Data Encryption:** All data transmitted via HTTPS/TLS
- **Access Controls:** API key-based authentication required
- **Data Minimization:** Only necessary transcript text is transmitted
- **Processing Limitation:** Data used solely for analysis, not training or other purposes

#### 4. SUB-PROCESSING
Any sub-processors must be approved in writing and bound by equivalent data protection obligations.

#### 5. DATA SUBJECT RIGHTS
Processor will assist Controller in responding to data subject requests including:
- Right of access and rectification
- Right to erasure ("right to be forgotten")
- Right to data portability
- Right to object to processing

#### 6. BREACH NOTIFICATION
Processor must notify Controller within 72 hours of becoming aware of any personal data breach.

#### 7. LIABILITY AND INDEMNIFICATION
Each party's liability is limited as specified in the main service agreement, with specific provisions for data protection violations.

---

## C. User Consent Mockup

### AUDIO PROCESSING CONSENT NOTICE

**Before You Upload Your Audio File**

By uploading an audio file to this comedy transcription service, you acknowledge and consent to the following data processing:

**What We Do With Your Audio:**
1. **Local Transcription:** Your audio file is processed locally using OpenAI's Whisper technology to create a text transcript. The audio file is temporarily stored on our server and permanently deleted after processing.

2. **Optional AI Analysis:** If you enable AI analysis, the TEXT TRANSCRIPT (not your audio) is sent to Google's Gemini AI service to analyze comedy bits and match them against your set list. No audio data is transmitted to Google.

**Your Rights:**
- You can request deletion of any stored data at any time
- You can opt out of AI analysis and use transcription only
- You maintain all rights to your original audio content

**Data Security:**
- All file transfers use encrypted connections (HTTPS)
- Audio files are automatically deleted after processing
- We do not store, sell, or share your content with third parties beyond the analysis service

**Third-Party Processing:**
- Google Gemini API may temporarily process your transcript text for analysis
- Google's data processing is governed by their privacy policy and terms of service
- Text analysis data is not permanently stored by Google for this service

**File Requirements:**
- Maximum file size: 50MB
- Recommended duration: Under 5 minutes for optimal results
- Supported formats: MP3, WAV, M4A, and other common audio formats

□ **I understand and consent to the audio transcription and optional AI analysis as described above**

□ **I confirm I have the right to upload and process this audio content**

---

**Compliance Notes:**
- This consent mechanism meets GDPR Article 6 (lawful basis) and Article 7 (consent) requirements
- Users can withdraw consent at any time by contacting support
- All processing activities are documented in our data processing register
- Regular security assessments ensure ongoing compliance

---

**Document Version:** 1.0  
**Last Updated:** August 31, 2025  
**Next Review Date:** November 30, 2025