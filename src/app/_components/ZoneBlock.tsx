import { useDraggable, useDroppable } from '@dnd-kit/core';
import { LabelBlockProps } from './LabelBlock';
import { useState } from 'react';

interface ZoneBlockProps {
  id: string;
  sectionLabel: React.ReactElement<LabelBlockProps>;
  children: React.ReactNode;
}

export default function ZoneBlock(props: ZoneBlockProps) {
  const { id, sectionLabel, children } = props;

  // Draggable Properties
  const { 
    attributes: dragAttributes, 
    listeners: dragListeners, 
    setNodeRef: setDraggableRef, 
    transform, 
    isDragging 
  } = useDraggable({
    id: id,
    data: {
      type: 'zone'
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, ${isDragging ? 3 : 0})`,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : "auto",
  } : undefined;

  // Droppable Properties
  const { 
    isOver, 
    setNodeRef: setDroppableRef 
  } = useDroppable({
    id: id,
    data: {
      type: 'zone-container',
      accepts: ['section']
    },
  })

  // Combine refs
  const setRefs = (element: HTMLDivElement | null) => {
    setDraggableRef(element);
    setDroppableRef(element);
  }

  return (
    <div 
      className="bg-green-600 p-2 h-full w-full" 
      ref={setRefs} 
      style={style} 
    >
      <div className="flex items-center">
        <div {...dragListeners} {...dragAttributes} className="cursor-grab p-1">
          ⋮⋮
        </div>
        {sectionLabel}
      </div>

      <hr className="mb-1"></hr>

      {children}

    </div>
  )
}