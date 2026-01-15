import { useDroppable } from "@dnd-kit/core";

interface DroppableSquareProps {
  x: number,
  y: number,
  droppable: boolean;
}

export default function DroppableSquare(props: DroppableSquareProps) {
  const { x, y, droppable } = props;

  const { isOver, setNodeRef } = useDroppable({
    id: x + '-' + y,
    data: {
      type: 'grid-cell',
      x: x,
      y: y,
    }
  })

  const style = {
    color: isOver ? 'green' : undefined,
  }

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="w-full h-full aspect-square border border-gray-300" 
    >
      {x}-{y}
    </div>
  )
}