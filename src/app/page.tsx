'use client';
import LabelBlock from "./_components/LabelBlock";
import SectionBlock from "./_components/SectionBlock";
import ZoneBlock from "./_components/ZoneBlock";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, pointerWithin } from "@dnd-kit/core";
import { useState } from "react";
import Baseplate from "./_components/Baseplate";
import { ZonesData, SectionsData } from "@/lib/types";

export default function Home() {

  const [zones, setZones] = useState<ZonesData>({
    'zone-experience': {
      id: 'zone-experience',
      label: 'Experience',
      sectionIds: ['section-uwaterloo']
    },
    'zone-education': {
      id: 'zone-education',
      label: 'Education',
      sectionIds: ['section-mit']
    }
  });

  const [sections, setSections] = useState<SectionsData>({
    'section-uwaterloo': {
      id: 'section-uwaterloo',
      company: 'University of Waterloo',
      role: 'Software Engineer',
      location: 'blah',
      dates: 'blah',
      children: ['desc 1'],
    },
    'section-mit': {
      id: 'section-mit',
      company: 'MIT',
      role: 'Software Engineer',
      location: 'blah',
      dates: 'blah',
      children: ['desc 1'],
    }
  });

  // Manage state of zones that are in the inventory or the baseplate
  const [inventoryZoneIds, setInventoryZoneIds] = useState<string[]>(['zone-experience', 'zone-education']);
  const [baseplateZoneIds, setBaseplateZoneIds] = useState<string[]>([]);

  // Track the item currently being dragged
  const [activeId, setActiveId] = useState<string | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }


  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event; // active - item being dragged; over - the drop target

    setActiveId(null);

    // If there is no drop target, then user didn't drop anything valid
    if (!over) return;
 
    const draggedType = active.data.current?.type;
    const overType = over.data.current?.type;

    // Case 1: Zone → Baseplate
    if (over.id === 'baseplate' && draggedType === 'zone') {
      const draggedID = active.id as string;

      // Check if the zone is in the inventory (or else delete!)
      if (inventoryZoneIds.includes(draggedID)) {
        // Remove from inventory and add to baseplate
        setInventoryZoneIds(prev => prev.filter(id => id !== draggedID));
        setBaseplateZoneIds(prev => [...prev, draggedID]);
      }
    } 

    // Case 2: Section → Zone
    if (draggedType === 'section' && overType === 'zone-container') {
      const sectionId = active.id as string;
      const targetZoneId = over.id as string;

      setZones(prev => {
        const updated = { ...prev };
        
        // Remove section from all zones
        Object.keys(updated).forEach(zoneId => {
          updated[zoneId].sectionIds = updated[zoneId].sectionIds.filter(
            id => id !== sectionId
          );
        });
        
        // Add to target zone
        if (updated[targetZoneId]) {
          updated[targetZoneId].sectionIds.push(sectionId);
        }

        console.log(zones);
        
        return updated;
      }); 
    }

  }

  // Helper function to render a section by ID
  function renderSection(sectionId: string) {
    const section = sections[sectionId];
    
    if (!section) return null;

    return (
      <SectionBlock 
        id={section.id}
        company={<LabelBlock>{section.company}</LabelBlock>}
        role={<LabelBlock>{section.role}</LabelBlock>}
        location={<LabelBlock>{section.location}</LabelBlock>}
        dates={<LabelBlock>{section.dates}</LabelBlock>}
      >
        {section.children.map((desc, index) => (
          <LabelBlock key={index}>{desc}</LabelBlock>
        ))}
      </SectionBlock>
    );
  }

  // Updated helper function to render a zone by ID (using state data)
  function renderZone(zoneId: string) {
    const zone = zones[zoneId];
    
    if (!zone) return null;

    return (
      <ZoneBlock 
        id={zone.id}
        sectionLabel={<LabelBlock type='section'>{zone.label}</LabelBlock>}
      >
        {/* Dynamically render all sections that belong to this zone */}
        {zone.sectionIds.map(sectionId => (
          <div key={sectionId}>
            {renderSection(sectionId)}
          </div>
        ))}
      </ZoneBlock>
    );
  }

  return (
    <div className="">
      Resume Builder
      <DndContext 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin} // Algorithm to detect which drop zone you're over
      >
        <div className='grid grid-cols-2'>

          {/* Left Panel */}
          <div className="border-2 border-amber-500 p-2">
            <h2>Inventory</h2>

            <div className="flex items-center gap-2 mb-4">
              <button className="px-4 py-2 bg-blue-400" style={{boxShadow: '-3px 3px 0px 0px rgb(30, 64, 175)'}}>
                Create Zone Block
              </button>
              <button className="px-4 py-2 bg-blue-400" style={{boxShadow: '-3px 3px 0px 0px rgb(30, 64, 175)'}}>
                Create Section Block
              </button>
              <button className="px-4 py-2 bg-blue-400" style={{boxShadow: '-3px 3px 0px 0px rgb(30, 64, 175)'}}>
                Create Label Block
              </button>
            </div> 

            {/* Render zones in inventory */}
            {inventoryZoneIds.map(zoneId => (
              <div key={zoneId}>
                {renderZone(zoneId)}
              </div>
            ))}
          </div>
          <div className="border-2 border-sky-500 p-2">
            <h2>Baseplate</h2>

            <Baseplate>
              {baseplateZoneIds.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  Drop zones here
                </div>
              ) : (
                <>
                  {/* Render Experience Zone if on baseplate */}
                  {baseplateZoneIds.map(zoneId => (
                    <div key={zoneId}>
                      {renderZone(zoneId)}
                    </div>
                  ))}
                </>
              )}
            </Baseplate>
          </div>
        </div>

        {/* DRAG OVERLAY: Creates the ghost image that follows your cursor */}
        <DragOverlay>
          {activeId ? (
            <div style={{ cursor: 'grabbing' }}>
              {/* Check if dragging a zone or section */}
              {zones[activeId] ? renderZone(activeId) : renderSection(activeId)}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}