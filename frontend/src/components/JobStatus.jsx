import React, { useState } from 'react';
import { transcriptionAPI } from '../services/api';

const JobStatus = ({ job, onJobUpdate }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [showAnalysisForm, setShowAnalysisForm] = useState(false);
  const [setList, setSetList] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const getStatusClass = (status) => {
    switch (status) {
      case 'queued':
        return 'status-queued';
      case 'processing':
        return 'status-processing';
      case 'completed':
        return 'status-completed';
      case 'failed':
        return 'status-failed';
      default:
        return 'status-queued';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleGeminiAnalysis = async () => {
    setAnalyzing(true);
    try {
      const result = await transcriptionAPI.runGeminiAnalysis(job.job_id, setList, customPrompt);
      
      // Update the job with analysis results
      const updatedJob = { ...job, analysis: result };
      if (onJobUpdate) {
        onJobUpdate(updatedJob);
      }
      
      setShowAnalysisForm(false);
      setSetList('');
      setCustomPrompt('');
      
      console.log('FRONTEND: Gemini analysis completed!', result);
    } catch (error) {
      console.error('Failed to run Gemini analysis:', error);
      alert(`Gemini analysis failed: ${error.response?.data?.detail || error.message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className={`job-item ${job.status}`}>
      <div className="job-header">
        <div className="job-filename">
          {job.filename || `Job ${job.job_id.substring(0, 8)}`}
        </div>
        <div className={`job-status ${getStatusClass(job.status)}`}>
          {job.status}
          {job.status === 'processing' && <span className="loading"></span>}
        </div>
      </div>
      
      <div className="job-meta">
        <small>Created: {formatDate(job.created_at)}</small>
        {job.completed_at && (
          <small> • Completed: {formatDate(job.completed_at)}</small>
        )}
      </div>

      {job.status === 'completed' && job.result && (
        <div className="job-result">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Transcription:</strong>
            {!job.analysis && (
              <button
                onClick={() => setShowAnalysisForm(!showAnalysisForm)}
                className="upload-button"
                style={{ 
                  padding: '0.5rem 1rem', 
                  fontSize: '0.8rem',
                  background: '#9333ea',
                  borderColor: '#9333ea'
                }}
                disabled={analyzing}
              >
                {analyzing ? 'Analyzing...' : 'Gemini Analysis'}
              </button>
            )}
          </div>
          <div className="transcript-text">{job.result}</div>

          {showAnalysisForm && (
            <div className="analysis-form" style={{
              marginTop: '1rem',
              padding: '1rem',
              border: '1px solid #333',
              borderRadius: '8px',
              background: 'rgba(147, 51, 234, 0.1)'
            }}>
              <h4 style={{ margin: '0 0 1rem 0' }}>Gemini Comedy Analysis</h4>
              
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label htmlFor={`setlist-${job.job_id}`} style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Set List (optional):
                </label>
                <textarea
                  id={`setlist-${job.job_id}`}
                  value={setList}
                  onChange={(e) => setSetList(e.target.value)}
                  placeholder="Paste your planned setlist for comparison..."
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #333',
                    background: '#1a1a1a',
                    color: 'white'
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label htmlFor={`prompt-${job.job_id}`} style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Custom Analysis Prompt (optional):
                </label>
                <textarea
                  id={`prompt-${job.job_id}`}
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Enter custom analysis instructions (leave blank for default comedy analysis)..."
                  rows="2"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #333',
                    background: '#1a1a1a',
                    color: 'white'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleGeminiAnalysis}
                  className="upload-button"
                  style={{ 
                    padding: '0.5rem 1rem',
                    background: '#9333ea',
                    borderColor: '#9333ea'
                  }}
                  disabled={analyzing}
                >
                  {analyzing ? 'Analyzing...' : 'Analyze Comedy'}
                </button>
                <button
                  onClick={() => setShowAnalysisForm(false)}
                  className="upload-button"
                  style={{ 
                    padding: '0.5rem 1rem',
                    background: '#666',
                    borderColor: '#666'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {job.status === 'completed' && job.analysis && (
        <div className="job-analysis">
          <strong>Comedy Analysis (Gemini Flash 2.0):</strong>
          {job.analysis.success ? (
            <div className="analysis-content">
              <pre className="analysis-text">{job.analysis.analysis}</pre>
            </div>
          ) : (
            <div className="analysis-error" style={{ color: '#ef4444' }}>
              Analysis failed: {job.analysis.error}
            </div>
          )}
        </div>
      )}

      {job.status === 'failed' && job.error && (
        <div className="job-result" style={{ color: '#ef4444' }}>
          <strong>Error:</strong>
          <div>{job.error}</div>
        </div>
      )}
    </div>
  );
};

export default JobStatus;