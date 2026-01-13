import { useDraggable } from "@dnd-kit/core";
import LabelBlock, { LabelBlockProps } from "./LabelBlock";

interface SectionBlockProps {
  id: string;
  company: React.ReactElement<LabelBlockProps>;
  role: React.ReactElement<LabelBlockProps>;
  location: React.ReactElement<LabelBlockProps>;
  dates: React.ReactElement<LabelBlockProps>;
  children: React.ReactNode;
}

export default function SectionBlock(props: SectionBlockProps) {
  const { id, company, role, location, dates, children } = props;

  // Drag functionality - useDraggable to make the component draggable
  // Use id to help differrentiate similar items and type to identify as a section
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: {
      type: 'section'
    }
  })

  // Visual feedback for drag
  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px, ${isDragging ? 5 : 0})`,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : "auto",
  } : undefined;

  return (
    <div 
      className="bg-red-700 p-2 mb-2"
      ref={setNodeRef}      // Connects this DOM element to dnd-kit
      style={style}         // Applies the drag transform
      {...listeners}        // Adds mouse/touch event handlers for dragging
      {...attributes}       // Adds accessibility attributes
    >
      <div className="flex justify-between w-ful">
        <LabelBlock>{company}</LabelBlock>
        <LabelBlock>{location}</LabelBlock>
      </div>
      <div className="flex justify-between w-ful">
        <LabelBlock>{role}</LabelBlock>
        <LabelBlock>{dates}</LabelBlock>
      </div>

      {children}
    </div>
  )
}