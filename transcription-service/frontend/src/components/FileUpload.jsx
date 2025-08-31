import React, { useState } from 'react';
import { transcriptionAPI } from '../services/api';

const FileUpload = ({ onJobCreated }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

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

    setUploading(true);
    try {
      const result = await transcriptionAPI.uploadFile(file);
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