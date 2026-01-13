import { useDraggable } from '@dnd-kit/core';
import { LabelBlockProps } from './LabelBlock';

interface ZoneBlockProps {
  id: string;
  sectionLabel: React.ReactElement<LabelBlockProps>;
  children: React.ReactNode;
}

export default function ZoneBlock(props: ZoneBlockProps) {
  const { id, sectionLabel, children } = props;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: {
      type: 'zone'
    }
  });

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : "auto",
  } : undefined;

  return (
    <div 
      className="bg-green-600 p-2 mb-2" 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes} 
    >
      {sectionLabel} 

      <hr className="mb-1"></hr>

      {children}

    </div>
  )
}