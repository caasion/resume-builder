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
    labels,
    newZone,
    newSection,
    newLabel,
    inventoryZoneIds,
    inventorySectionIds,
    inventoryLabelIds,
    baseplateZoneIds,
    activeId,
    handleDragStart,
    handleDragEnd,
  } = useResumeDnD();

  const { renderSection, renderZone, renderLabel } = createRenderFunctions(zones, sections, labels);

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
            inventoryLabelIds={inventoryLabelIds}
            baseplateZoneIds={baseplateZoneIds}
          />

          <InventoryPanel 
            zoneIds={inventoryZoneIds}
            sectionIds={inventorySectionIds}
            labelIds={inventoryLabelIds}
            renderZone={renderZone}
            renderSection={renderSection}
            renderLabel={renderLabel}
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