import { useDroppable } from "@dnd-kit/core";
import DroppableSquare from "./DroppableSquare";
import { GRID_SQUARE_SIZE } from "@/lib/constants";

interface BaseplateProps {
  gridWidth: number;
  gridLength: number;
  children: React.ReactNode;
}

export default function Baseplate(props: BaseplateProps) {
  const { gridWidth, gridLength, children } = props;

  const gridStyles = {
    gridTemplateColumns: `repeat(${gridWidth}, ${GRID_SQUARE_SIZE}rem)`,
    gridTemplateRows: `repeat(${gridLength}, ${GRID_SQUARE_SIZE}rem)`
  }

  function renderGrid () {
    const grid = [];

    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        grid.push(<DroppableSquare key={i+'-'+j} x={j} y={i} droppable={true} />);
      }
    }

    return grid;
  }

  return (
    <div className="relative w-fit">
      <div 
        className="grid" 
        style={gridStyles}  
      >
        {renderGrid()}

        
      </div>
      <div 
        className="absolute grid w-full h-full inset-0 pointer-events-none"
        style={gridStyles}  
      >
        {children}
      </div>
    </div>
  )
} 

// 