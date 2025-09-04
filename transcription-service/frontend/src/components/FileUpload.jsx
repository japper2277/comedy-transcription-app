import React, { useState } from 'react';
import { transcriptionAPI } from '../services/api';

const FileUpload = ({ onJobCreated }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [model, setModel] = useState('whisper-plus-gemini');
  const [setList, setSetList] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/flac', 'audio/webm', 'video/mp4',
      'audio/x-m4a', 'audio/m4a', 'audio/mp4a-latm', 'audio/aac'
    ];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid audio file (MP3, WAV, M4A, FLAC, MP4, WebM, AAC)');
      return;
    }

    // Validate file size (25MB limit for OpenAI)
    const maxSize = 25 * 1024 * 1024; // 25MB
    if (file.size > maxSize) {
      alert('File size must be less than 25MB');
      return;
    }

    console.log('🎤 UPLOAD DEBUG - File selected:', {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      model: model,
      setListLength: setList?.length || 0,
      customPromptLength: customPrompt?.length || 0
    });

    console.log('📤 API Request payload:', {
      model,
      set_list: setList,
      custom_prompt: customPrompt
    });

    setUploading(true);
    try {
      const result = await transcriptionAPI.uploadFile(file, {
        model,
        set_list: setList,
        custom_prompt: customPrompt
      });
      onJobCreated(result);
      alert(`File uploaded successfully! Job ID: ${result.job_id}`);
    } catch (error) {
      console.error('Upload failed:', error);
      alert(`Upload failed: ${error.response?.data?.detail || error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
    e.target.value = ''; // Reset input
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="upload-section">
      {/* Model Selection */}
      <div className="model-selection">
        <h3>AI Model Selection</h3>
        <div className="model-options">
          <label className="model-option">
            <input
              type="radio"
              name="model"
              value="openai-whisper"
              checked={model === 'openai-whisper'}
              onChange={(e) => setModel(e.target.value)}
              disabled={uploading}
            />
            <span>OpenAI Whisper (Transcription Only)</span>
          </label>
          <label className="model-option">
            <input
              type="radio"
              name="model"
              value="whisper-plus-gemini"
              checked={model === 'whisper-plus-gemini'}
              onChange={(e) => setModel(e.target.value)}
              disabled={uploading}
            />
            <span>Whisper + Gemini Flash 2.0 (Transcription + Comedy Analysis)</span>
          </label>
          <label className="model-option">
            <input
              type="radio"
              name="model"
              value="gemini-analysis-only"
              checked={model === 'gemini-analysis-only'}
              onChange={(e) => setModel(e.target.value)}
              disabled={uploading}
            />
            <span>Gemini Analysis Only (For existing transcripts)</span>
          </label>
        </div>
      </div>

      {/* Analysis Options - only show when Gemini is selected */}
      {(model === 'whisper-plus-gemini' || model === 'gemini-analysis-only') && (
        <div className="analysis-options">
          <h3>Comedy Analysis Options</h3>
          <div className="form-group">
            <label htmlFor="setlist">Set List (optional):</label>
            <textarea
              id="setlist"
              value={setList}
              onChange={(e) => setSetList(e.target.value)}
              placeholder="Paste your planned setlist here for comparison analysis..."
              rows="4"
              disabled={uploading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="custom-prompt">Custom Analysis Prompt (optional):</label>
            <textarea
              id="custom-prompt"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter custom analysis instructions (leave blank for default comedy analysis)..."
              rows="3"
              disabled={uploading}
            />
          </div>
        </div>
      )}

      <div
        className={`upload-area ${dragOver ? 'drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          accept="audio/*,video/mp4"
          onChange={handleFileChange}
          className="file-input"
          disabled={uploading}
        />
        
        <div>
          <h3>
            {uploading ? 'Uploading...' : 'Drop your audio file here or click to browse'}
            {uploading && <span className="loading"></span>}
          </h3>
          <p>Supported formats: MP3, WAV, M4A, FLAC, MP4, WebM (max 25MB)</p>
        </div>
        
        <button
          className="upload-button"
          disabled={uploading}
          onClick={(e) => {
            e.stopPropagation();
            document.getElementById('file-input').click();
          }}
        >
          {uploading ? 'Uploading...' : 'Choose File'}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;