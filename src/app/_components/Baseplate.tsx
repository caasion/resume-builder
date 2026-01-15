import { useDroppable } from "@dnd-kit/core";
import DroppableSquare from "./DroppableSquare";

interface BaseplateProps {
  children: React.ReactNode
}

export default function Baseplate(props: BaseplateProps) {
  const { children } = props;

  const gridWidth = 15;
  const gridLength = 20;

  function renderGrid () {
    const grid = [];

    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        grid.push(<DroppableSquare key={i+'-'+j} x={i} y={j} droppable={true} />);
      }
    }

    return grid;
  }

  return (
    <div 
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${gridLength}), minmax(0, 1fr)`
      }}  
    >
      {renderGrid()}
    </div>
  )
} 