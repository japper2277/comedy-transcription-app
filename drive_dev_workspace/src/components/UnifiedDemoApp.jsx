import React from 'react'
import UnifiedSetlist from './setlist/UnifiedSetlist'

export default function UnifiedDemoApp() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎭 Unified Drag System Demo</h1>
        <p className="demo-description">
          Experience the power of @dnd-kit with seamless drag-and-drop between joke bank and setlist. 
          Drag jokes from the left bank to build your setlist on the right, then reorder them as needed.
        </p>
        <div style={{ 
          background: 'rgba(29, 185, 84, 0.1)', 
          border: '1px solid #1DB954', 
          borderRadius: '8px', 
          padding: '1rem',
          marginTop: '1rem'
        }}>
          <h3 style={{ color: '#1DB954', marginBottom: '0.5rem' }}>✨ Key Features:</h3>
          <ul style={{ color: '#b3b3b3', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>Bank-to-Setlist Drag:</strong> Seamlessly drag jokes from bank to setlist</li>
            <li><strong>Setlist Reordering:</strong> Drag and drop to reorder your setlist</li>
            <li><strong>Unified Physics:</strong> Consistent animations and interactions throughout</li>
            <li><strong>React 19 Compatible:</strong> Built with latest React patterns</li>
            <li><strong>Accessibility:</strong> Full keyboard navigation support</li>
          </ul>
        </div>
      </div>
      
      <UnifiedSetlist />
    </div>
  )
}