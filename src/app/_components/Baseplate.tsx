import { useDroppable } from "@dnd-kit/core";
import DroppableSquare from "./DroppableSquare";

interface BaseplateProps {
  gridWidth: number;
  gridLength: number;
  children: React.ReactNode;
}

export default function Baseplate(props: BaseplateProps) {
  const { gridWidth, gridLength, children } = props;

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
    <div className="relative w-full">
      <div 
        className="grid" 
        style={{
          gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridLength}, minmax(0, 1fr))`
        }}  
      >
        {renderGrid()}

        
      </div>
      <div 
        className="absolute grid w-full h-full inset-0 pointer-events-none"
        style={{
          gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridLength}, minmax(0, 1fr))`,
        }}  
      >
        {children}
      </div>
    </div>
  )
} 

// 