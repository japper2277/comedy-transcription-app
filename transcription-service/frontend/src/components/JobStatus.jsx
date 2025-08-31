import React from 'react';

const JobStatus = ({ job }) => {
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
          <strong>Transcription:</strong>
          <div>{job.result}</div>
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