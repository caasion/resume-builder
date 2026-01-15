import { GRID_SQUARE_SIZE } from "@/lib/constants";
import { ZonesData, BaseplateZonesData } from "@/lib/types";
import React from "react";

interface DisplayBlockProps {
  children: React.ReactNode;
  width: number;
  length: number;
}

export default function DisplayBlock({
  children,
  width,
  length,
}: DisplayBlockProps) {


  return (
    <div
      className="relative"
      style={{
        width: width * (GRID_SQUARE_SIZE * 16),
        height: length * (GRID_SQUARE_SIZE * 16),
      }}
    >
      {children}
    </div>
  )
}