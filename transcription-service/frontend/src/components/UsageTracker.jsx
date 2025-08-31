import React from 'react';

const UsageTracker = ({ 
  minutesUsed = 0, 
  minutesLimit = 300, 
  billingPeriodEnd = null 
}) => {
  const usagePercentage = (minutesUsed / minutesLimit) * 100;
  const minutesRemaining = Math.max(0, minutesLimit - minutesUsed);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'End of month';
    return new Date(dateString).toLocaleDateString();
  };

  const getUsageColor = () => {
    if (usagePercentage < 50) return '#1DB954';
    if (usagePercentage < 80) return '#f5c518';
    return '#ef4444';
  };

  return (
    <div className="usage-tracker">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Monthly Usage</h3>
        <div style={{ fontSize: '0.9rem', color: '#b3b3b3' }}>
          Resets: {formatDate(billingPeriodEnd)}
        </div>
      </div>
      
      <div className="usage-bar">
        <div 
          className="usage-fill"
          style={{ 
            width: `${Math.min(usagePercentage, 100)}%`,
            background: getUsageColor()
          }}
        ></div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '0.5rem',
        fontSize: '0.9rem'
      }}>
        <span>{minutesUsed} minutes used</span>
        <span>{minutesRemaining} minutes remaining</span>
      </div>
      
      {usagePercentage >= 90 && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid #ef4444',
          borderRadius: '6px',
          fontSize: '0.9rem'
        }}>
          ⚠️ You're approaching your monthly limit. 
          {minutesRemaining === 0 && ' Upload blocked until next billing cycle.'}
        </div>
      )}
      
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.85rem', 
        color: '#b3b3b3' 
      }}>
        Plan: <strong style={{ color: '#45a3ff' }}>$5/month</strong> • 
        Overage: <strong>$0.02/minute</strong>
      </div>
    </div>
  );
};

export default UsageTracker;