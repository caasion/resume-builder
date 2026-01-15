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
    updateZone,
    updateSection,
    updateLabel,
    inventoryZoneIds,
    inventorySectionIds,
    inventoryLabelIds,
    baseplateZones,
    updateBaseplateZone,
    activeId,
    handleDragStart,
    handleDragEnd,
  } = useResumeDnD();

  const { renderSection, renderZone, renderLabel } = createRenderFunctions(zones, sections, labels, updateLabel);

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
            labels={labels}
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
            zones={zones}
            baseplateZones={baseplateZones}
            renderZone={renderZone}
            onResizeZone={updateZone}
          />
        </div>

        <DragOverlay>
          {activeId ? (
            <div style={{ cursor: 'grabbing' }} className="opacity-50 w-fit h-fit">
              {zones[activeId] 
                ? (
                  <DisplayBlock 
                    width={zones[activeId].width}
                    length={zones[activeId].length}
                  >
                    {renderZone(activeId)}
                  </DisplayBlock>
                ) 
                : renderSection(activeId)}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
} 

