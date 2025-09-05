import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import JobList from './components/JobList';
import UsageTracker from './components/UsageTracker';
import BackendLogs from './components/BackendLogs';
import { transcriptionAPI } from './services/api';

function App() {
  const [newJob, setNewJob] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [healthStatus, setHealthStatus] = useState(null);

  // Check API health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const health = await transcriptionAPI.healthCheck();
        setHealthStatus('healthy');
      } catch (error) {
        setHealthStatus('error');
        console.error('API health check failed:', error);
        
        // Show helpful error message for common issues
        if (error.message.includes('ECONNREFUSED')) {
          console.error('💡 TIP: Make sure the backend is running on http://localhost:8000');
        } else if (error.message.includes('CORS')) {
          console.error('💡 TIP: CORS issue - try refreshing the page or restarting the backend');
        }
      }
    };

    checkHealth();
  }, []);

  const handleJobCreated = (job) => {
    setNewJob(job);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>AI Transcription Service</h1>
        <p>Upload your audio files and get accurate transcriptions powered by OpenAI Whisper</p>
        
        {healthStatus && (
          <div style={{ 
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.85rem',
            display: 'inline-block',
            background: healthStatus === 'healthy' 
              ? 'rgba(29, 185, 84, 0.2)' 
              : 'rgba(239, 68, 68, 0.2)',
            color: healthStatus === 'healthy' ? '#1DB954' : '#ef4444'
          }}>
            API Status: {healthStatus === 'healthy' ? 'Online' : 'Offline'}
          </div>
        )}
      </div>

      <UsageTracker 
        minutesUsed={45}
        minutesLimit={300}
        billingPeriodEnd="2024-02-01"
      />

      <FileUpload onJobCreated={handleJobCreated} />

      <JobList 
        newJob={newJob}
        refreshTrigger={refreshTrigger}
      />

      <div style={{ 
        textAlign: 'center', 
        marginTop: '3rem', 
        color: '#b3b3b3',
        fontSize: '0.9rem'
      }}>
        <p>
          Powered by <strong>OpenAI Whisper</strong> • 
          $5/month for 300 minutes • 
          High-accuracy transcription
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Need more minutes? Upgrade to Pro for unlimited transcriptions.
        </p>
      </div>

      <BackendLogs />
    </div>
  );
}

export default App;