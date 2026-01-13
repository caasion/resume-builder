'use client';
import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import { useResumeDnD } from "@/hooks/useResumeDnd";
import { createRenderFunctions } from "@/lib/renderers";
import InventoryPanel from "./_components/InventoryPanel";
import BaseplatePanel from "./_components/BaseplatePanel";
import DebugPanel from "./_components/DebugPanel";

export default function Home() {
  const {
    zones,
    sections,
    newZone,
    newSection,
    newLabel,
    inventoryZoneIds,
    inventorySectionIds,
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
        <div className='grid grid-cols-3'>
          <DebugPanel 
            zones={zones}
            sections={sections}
            inventorySectionIds={inventorySectionIds}
            inventoryZoneIds={inventoryZoneIds}
            baseplateZoneIds={baseplateZoneIds}
          />

          <InventoryPanel 
            zoneIds={inventoryZoneIds}
            sectionIds={inventorySectionIds}
            renderZone={renderZone}
            renderSection={renderSection}
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