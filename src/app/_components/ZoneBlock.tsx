import { useDraggable } from '@dnd-kit/core';
import { LabelBlockProps } from './LabelBlock';

interface ZoneBlockProps {
  sectionLabel: React.ReactElement<LabelBlockProps>;
  children: React.ReactNode;
}

export default function ZoneBlock(props: ZoneBlockProps) {
  const { sectionLabel, children } = props;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'zone'
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div className="bg-green-600 p-2 mb-2" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {sectionLabel}

      <hr className="mb-1"></hr>

      {children}

    </div>
  )
}