import React, { useState, useEffect } from 'react';
import JobStatus from './JobStatus';
import { transcriptionAPI } from '../services/api';

const JobList = ({ newJob, refreshTrigger }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await transcriptionAPI.listJobs();
      setJobs(response.jobs || []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const pollJobStatus = async (jobId) => {
    try {
      const updatedJob = await transcriptionAPI.getJobStatus(jobId);
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.job_id === jobId ? { 
            ...job, 
            ...updatedJob,
            // Preserve analysis structure if it exists
            analysis: updatedJob.analysis || job.analysis
          } : job
        )
      );
    } catch (error) {
      console.error('Failed to poll job status:', error);
    }
  };

  const handleJobUpdate = (updatedJob) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.job_id === updatedJob.job_id ? updatedJob : job
      )
    );
  };

  useEffect(() => {
    fetchJobs();
  }, [refreshTrigger]);

  // Add new job when uploaded
  useEffect(() => {
    if (newJob) {
      setJobs(prevJobs => [
        {
          job_id: newJob.job_id,
          status: newJob.status,
          created_at: new Date().toISOString(),
          result: null,
          error: null
        },
        ...prevJobs
      ]);
    }
  }, [newJob]);

  // Poll processing jobs every 3 seconds
  useEffect(() => {
    const processingJobs = jobs.filter(job => 
      job.status === 'queued' || job.status === 'processing'
    );

    if (processingJobs.length > 0) {
      const interval = setInterval(() => {
        processingJobs.forEach(job => {
          pollJobStatus(job.job_id);
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [jobs]);

  if (loading) {
    return (
      <div className="jobs-section">
        <div className="jobs-header">
          <h2>Transcription Jobs</h2>
        </div>
        <div className="empty-state">
          Loading jobs...
          <span className="loading"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-section">
      <div className="jobs-header">
        <h2>Transcription Jobs</h2>
        <button 
          onClick={fetchJobs}
          className="upload-button"
          style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
        >
          Refresh
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-state">
          <p>No transcription jobs yet.</p>
          <p>Upload an audio file to get started!</p>
        </div>
      ) : (
        <div className="jobs-list">
          {jobs
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map(job => (
              <JobStatus key={job.job_id} job={job} onJobUpdate={handleJobUpdate} />
            ))
          }
        </div>
      )}
    </div>
  );
};

export default JobList;