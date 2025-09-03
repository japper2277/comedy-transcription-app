import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function SetlistItem({ item, index, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.setlistId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="setlist-item"
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <span style={{ 
              background: '#45a3ff', 
              color: 'white', 
              padding: '0.1rem 0.4rem', 
              borderRadius: '4px', 
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}>
              #{index}
            </span>
            <div className="joke-title">{item.title}</div>
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginLeft: '2rem' }}>
            {item.content?.slice(0, 60)}...
          </div>
          <div className="joke-tags" style={{ marginLeft: '2rem', marginTop: '0.3rem' }}>
            {item.tags?.map(tag => (
              <span key={tag} className="joke-tag">{tag}</span>
            ))}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#ef4444',
            cursor: 'pointer',
            padding: '0.2rem',
            fontSize: '1rem',
            opacity: 0.7,
          }}
          title="Remove from setlist"
        >
          ×
        </button>
      </div>
    </div>
  )
}