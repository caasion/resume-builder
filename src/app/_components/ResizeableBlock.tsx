import { GRID_SQUARE_SIZE } from "@/lib/constants";
import { useState, useRef } from "react";

interface ResizeableZoneProps {
  children: React.ReactNode;
  width: number;
  length: number;
  onResize: (newWidth: number, newLength: number) => void;
  minWidth?: number;
  minLength?: number;
}

export default function ResizableBlock({
  children,
  width,
  length,
  onResize,
  minWidth = 0,
  minLength = 0,
}: ResizeableZoneProps) {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeDirection, setResizeDirection] = useState<'se' | 'e' | 's' | null>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startSizeRef = useRef({ width: 0, length: 0 });

  function handleResizeStart(e: React.MouseEvent, direction: 'se' | 'e' | 's') {
    // Stop default actions
    e.preventDefault();
    e.stopPropagation();

    // Prepare values
    setIsResizing(true);
    setResizeDirection(direction);
    startPosRef.current = { x: e.clientX, y: e.clientY };
    startSizeRef.current = { width, length };

    // Add global mouse lsiteners
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);

    console.log("Resize started"); // DELETE THIS RAAA
    console.log("Resize start:", isResizing, resizeDirection);
  }

  function handleResizeMove(e: MouseEvent) {
    console.log("Resize mouse move:", isResizing, resizeDirection); // DELETE THIS RAAA

    // Verify that we are actually in a resize move
    if (!isResizing || !resizeDirection) return;

    // Calculate change in mouse position
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;

    // Convert pixel deltas to grid units
    const gridDeltaX = Math.round(deltaX / GRID_SQUARE_SIZE);
    const gridDeltaY = Math.round(deltaY / GRID_SQUARE_SIZE);

    let newWidth = startSizeRef.current.width;
    let newLength = startSizeRef.current.length;

    // Apply changes based on direction
    if (resizeDirection === 'se' || resizeDirection === 'e') {
      newWidth = Math.max(minWidth, startSizeRef.current.width + gridDeltaX);
    }
    if (resizeDirection === 'se' || resizeDirection === 's') {
      newLength = Math.max(minLength, startSizeRef.current.length + gridDeltaY);
    }

    // Only update if size actually changed
    if (newWidth !== width || newLength !== length) {
      onResize(newWidth, newLength);
    }

    console.log("Resizing!!!", deltaX, deltaY, gridDeltaX, gridDeltaY); // DELETE THIS RAAA
  }

  function handleResizeEnd() {
    setIsResizing(false);
    setResizeDirection(null);

    // Remove global mouse lsiteners
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);

    console.log("Resize ended."); // DELETE THIS RAAA
  }

  return (
    <div className="relative w-full h-full">
      {children}

      {/* Right edge handle */}
      <div
        className="absolute top-0 right-0 w-2 h-full cursor-ew-resize bg-blue-500 opacity-0 hover:opacity-50 transition-opacity"
        onMouseDown={(e) => handleResizeStart(e, 'e')}
      />

      {/* Bottom edge handle */}
      <div
        className="absolute bottom-0 left-0 h-2 w-full cursor-ns-resize bg-blue-500 opacity-0 hover:opacity-50 transition-opacity"
        onMouseDown={(e) => handleResizeStart(e, 's')}
      />

      {/* Corner handle (southeast) */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize bg-blue-600 opacity-0 hover:opacity-75 transition-opacity"
        onMouseDown={(e) => handleResizeStart(e, 'se')}
      />
    </div>
  )
}