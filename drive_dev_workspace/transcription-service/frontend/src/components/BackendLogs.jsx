import React, { useState, useEffect } from 'react';

const BackendLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Capture console logs
    const originalLog = console.log;
    const originalError = console.error;
    
    const addLog = (type, message) => {
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev.slice(-49), { 
        id: Date.now(), 
        type, 
        message: typeof message === 'object' ? JSON.stringify(message) : message,
        timestamp 
      }]);
    };

    // Override console methods
    console.log = (...args) => {
      originalLog.apply(console, args);
      if (args.some(arg => typeof arg === 'string' && (
        arg.includes('BACKEND') || 
        arg.includes('GEMINI') || 
        arg.includes('WHISPER') ||
        arg.includes('🔌') ||
        arg.includes('✅') ||
        arg.includes('❌')
      ))) {
        addLog('info', args.join(' '));
      }
    };

    console.error = (...args) => {
      originalError.apply(console, args);
      addLog('error', args.join(' '));
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  const clearLogs = () => setLogs([]);

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      zIndex: 1000,
      width: isVisible ? '500px' : 'auto'
    }}>
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          padding: '10px 15px',
          background: '#1DB954',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '10px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        {isVisible ? '📋 Hide Logs' : '📋 Show Backend Logs'} ({logs.length})
      </button>

      {isVisible && (
        <div style={{
          background: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '8px',
          maxHeight: '400px',
          overflowY: 'auto',
          fontSize: '12px',
          fontFamily: 'Monaco, Consolas, monospace'
        }}>
          <div style={{
            padding: '10px',
            borderBottom: '1px solid #333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#2a2a2a'
          }}>
            <span style={{ color: '#1DB954', fontWeight: 'bold' }}>
              Backend Logs
            </span>
            <button
              onClick={clearLogs}
              style={{
                padding: '5px 10px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              Clear
            </button>
          </div>
          
          <div style={{ padding: '10px', maxHeight: '300px', overflowY: 'auto' }}>
            {logs.length === 0 ? (
              <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
                No logs yet. Upload a file to see backend activity.
              </div>
            ) : (
              logs.map(log => (
                <div key={log.id} style={{
                  marginBottom: '8px',
                  padding: '5px',
                  borderRadius: '3px',
                  background: log.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(29, 185, 84, 0.1)',
                  border: `1px solid ${log.type === 'error' ? '#ef4444' : '#1DB954'}20`
                }}>
                  <div style={{
                    color: '#888',
                    fontSize: '10px',
                    marginBottom: '2px'
                  }}>
                    {log.timestamp}
                  </div>
                  <div style={{
                    color: log.type === 'error' ? '#ef4444' : '#1DB954',
                    wordBreak: 'break-word'
                  }}>
                    {log.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BackendLogs;