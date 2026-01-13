'use client';
import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import { useResumeDnD } from "@/hooks/useResumeDnd";
import { createRenderFunctions } from "@/lib/renderers";
import InventoryPanel from "./_components/InventoryPanel";
import BaseplatePanel from "./_components/BaseplatePanel";

export default function Home() {
  const {
    zones,
    sections,
    newZone,
    newSection,
    newLabel,
    inventoryZoneIds,
    baseplateZoneIds,
    activeId,
    handleDragStart,
    handleDragEnd,
  } = useResumeDnD();

  const { renderSection, renderZone } = createRenderFunctions(zones, sections);

  return (
    <div className="">
      Resume Builder
      
      <DndContext 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
      >
        <div className='grid grid-cols-2'>
          <InventoryPanel 
            zoneIds={inventoryZoneIds}
            renderZone={renderZone}
            onCreateZone={newZone}
            onCreateSection={newSection}
            onCreateLabel={newLabel}
          />
          
          <BaseplatePanel 
            zoneIds={baseplateZoneIds}
            renderZone={renderZone}
          />
        </div>

        <DragOverlay>
          {activeId ? (
            <div style={{ cursor: 'grabbing' }}>
              {zones[activeId] ? renderZone(activeId) : renderSection(activeId)}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}