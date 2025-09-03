import React, { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers'

import JokeItem from './JokeItem'
import SetlistItem from './SetlistItem'

const mockJokes = [
  {
    id: 'joke-1',
    title: 'Airport Security',
    content: 'You know what I love about airport security? They make everyone equal...',
    tags: ['travel', 'observational']
  },
  {
    id: 'joke-2',
    title: 'Dating Apps',
    content: 'Dating apps are like online shopping...',
    tags: ['dating', 'technology']
  },
  {
    id: 'joke-3',
    title: 'Working From Home',
    content: 'Working from home is great until you realize...',
    tags: ['work', 'pandemic']
  },
  {
    id: 'joke-4',
    title: 'Fitness Trackers',
    content: 'I got a fitness tracker and now I know exactly...',
    tags: ['fitness', 'technology']
  },
  {
    id: 'joke-5',
    title: 'Social Media',
    content: 'Social media is like that friend who...',
    tags: ['technology', 'social']
  }
]

export default function UnifiedSetlist() {
  const [jokes] = useState(mockJokes)
  const [setlist, setSetlist] = useState([])
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    // Handle drag from joke bank to setlist
    if (active.id.startsWith('joke-') && over.id === 'setlist-droppable') {
      const joke = jokes.find(j => j.id === active.id)
      if (joke && !setlist.find(s => s.id === joke.id)) {
        setSetlist([...setlist, { ...joke, setlistId: `setlist-${joke.id}` }])
      }
      return
    }

    // Handle reordering within setlist
    if (active.id !== over.id && over.id.startsWith('setlist-')) {
      const oldIndex = setlist.findIndex(item => item.setlistId === active.id)
      const newIndex = setlist.findIndex(item => item.setlistId === over.id)
      
      if (oldIndex !== -1 && newIndex !== -1) {
        setSetlist(arrayMove(setlist, oldIndex, newIndex))
      }
    }
  }

  const removeFromSetlist = (itemId) => {
    setSetlist(setlist.filter(item => item.setlistId !== itemId))
  }

  const activeItem = activeId ? 
    jokes.find(j => j.id === activeId) || setlist.find(s => s.setlistId === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <div className="unified-setlist">
        {/* Joke Bank */}
        <div className="joke-bank">
          <div className="panel-header">
            <h2>Joke Bank</h2>
            <span className="joke-count">{jokes.length}</span>
          </div>
          <SortableContext items={jokes.map(j => j.id)} strategy={verticalListSortingStrategy}>
            {jokes.map(joke => (
              <JokeItem key={joke.id} joke={joke} />
            ))}
          </SortableContext>
        </div>

        {/* Current Setlist */}
        <div className="current-setlist">
          <div className="panel-header">
            <h2>Current Setlist</h2>
            <span className="joke-count">{setlist.length}</span>
          </div>
          
          {setlist.length === 0 ? (
            <div id="setlist-droppable" className="drop-zone">
              Drag jokes here to build your setlist
            </div>
          ) : (
            <SortableContext 
              items={setlist.map(s => s.setlistId)} 
              strategy={verticalListSortingStrategy}
            >
              {setlist.map((item, index) => (
                <SetlistItem 
                  key={item.setlistId} 
                  item={item} 
                  index={index + 1}
                  onRemove={() => removeFromSetlist(item.setlistId)}
                />
              ))}
            </SortableContext>
          )}
        </div>
      </div>

      <DragOverlay>
        {activeItem ? (
          <div className="drag-overlay">
            <div className="joke-title">{activeItem.title}</div>
            <div className="joke-tags">
              {activeItem.tags?.map(tag => (
                <span key={tag} className="joke-tag">{tag}</span>
              ))}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}