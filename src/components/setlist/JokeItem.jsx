import React from 'react'
import { useDraggable } from '@dnd-kit/core'

export default function JokeItem({ joke }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: joke.id,
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  } : {}

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="joke-item"
    >
      <div className="joke-title">{joke.title}</div>
      <div className="joke-content" style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.3rem' }}>
        {joke.content.slice(0, 80)}...
      </div>
      <div className="joke-tags">
        {joke.tags.map(tag => (
          <span key={tag} className="joke-tag">{tag}</span>
        ))}
      </div>
    </div>
  )
}