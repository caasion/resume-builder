import { GRID_SQUARE_SIZE } from "@/lib/constants";
import { useState, useRef } from "react";

interface ResizeableZoneProps {
  children: React.ReactNode;
  width: number;
  length: number;
  onResize: (newWidth: number, newLength: number) => void;
  maxWidth?: number;
  maxLength?: number;
  minWidth?: number;
  minLength?: number;
}

export default function ResizableBlock({
  children,
  width,
  length,
  onResize,
  maxWidth,
  maxLength,
  minWidth = 0,
  minLength = 0,
}: ResizeableZoneProps) {
  const isResizingRef = useRef<boolean>(false);
  const resizeDirectionRef = useRef<'se' | 'e' | 's' | null>(null);

  const startPosRef = useRef({ x: 0, y: 0 });
  const startSizeRef = useRef({ width: 0, length: 0 });

  function handleResizeStart(e: React.MouseEvent, direction: 'se' | 'e' | 's') {
    // Stop default actions
    e.preventDefault();
    e.stopPropagation();

    // Prepare values
    isResizingRef.current = true;
    resizeDirectionRef.current = direction;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    startSizeRef.current = { width, length };

    // Add global mouse lsiteners
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  }

  function handleResizeMove(e: MouseEvent) {
    // Verify that we are actually in a resize move
    if (!isResizingRef.current || !resizeDirectionRef.current) return;

    // Calculate change in mouse position
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;

    // Convert pixel deltas to grid units
    const gridDeltaX = Math.round(deltaX / (GRID_SQUARE_SIZE * 16));
    const gridDeltaY = Math.round(deltaY / (GRID_SQUARE_SIZE * 16));

    let newWidth = startSizeRef.current.width;
    let newLength = startSizeRef.current.length;

    // Apply changes based on direction
    if (resizeDirectionRef.current === 'se' || resizeDirectionRef.current === 'e') {
      newWidth = Math.max(minWidth, startSizeRef.current.width + gridDeltaX);
      if (maxWidth) newWidth = Math.min(maxWidth, newWidth);
    }
    if (resizeDirectionRef.current === 'se' || resizeDirectionRef.current === 's') {
      newLength = Math.max(minLength, startSizeRef.current.length + gridDeltaY);
      if (maxLength) newLength = Math.min(maxLength, newLength);
    }

    // Only update if size actually changed
    if (newWidth !== width || newLength !== length) {
      onResize(newWidth, newLength);
    }
  }

  function handleResizeEnd() {
    isResizingRef.current = false;
    resizeDirectionRef.current = null;

    // Remove global mouse lsiteners
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
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