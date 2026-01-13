'use client';
import LabelBlock from "./_components/LabelBlock";
import SectionBlock from "./_components/SectionBlock";
import ZoneBlock from "./_components/ZoneBlock";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import Baseplate from "./_components/Baseplate";

export default function Home() {

  // Manage state of zones that are in the inventory or the baseplate
  const [inventoryZoneIds, setInventoryZoneIds] = useState<string[]>(['zone-experience', 'zone-education']);
  const [baseplateZoneIds, setBaseplateZoneIds] = useState<string[]>([]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // active - item being dragged; over - the drop target

    // If there is no drop target, then user didn't drop anything valid
    if (!over) return;

    // Then, check if a zone was dropped on the baseplate
    if (over.id === 'baseplate') {
      const draggedID = active.id as string;

      // Check if the zone is in the inventory (or else delete!)
      if (inventoryZoneIds.includes(draggedID)) {
        // Remove from inventory and add to baseplate
        setInventoryZoneIds(prev => prev.filter(id => id !== draggedID));
        setBaseplateZoneIds(prev => [...prev, draggedID]);
      }
    } 

  }

  return (
    <div className="">
      Resume Builder
      <DndContext 
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter} // Algorithm to detect which drop zone you're over
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

            {/* Render Experience Zone if in inventory */}
            {inventoryZoneIds.includes('zone-experience') && (
              <ZoneBlock 
                id="zone-experience"
                sectionLabel={<LabelBlock type='section'>Experience</LabelBlock>}
              >
                <SectionBlock 
                  id="section-uwaterloo"
                  company={<LabelBlock>University of Waterloo</LabelBlock>}
                  role={<LabelBlock>Software Engineer</LabelBlock>}
                  location={<LabelBlock>Waterloo, ON</LabelBlock>}
                  dates={<LabelBlock>May 2024 - Aug 2024</LabelBlock>}
                >
                  <LabelBlock>Built resume builder with React</LabelBlock>
                  <LabelBlock>Implemented drag and drop</LabelBlock>
                  <LabelBlock>Learned TypeScript</LabelBlock>
                </SectionBlock>
              </ZoneBlock> 
            )}

            {/* Render Education Zone if in inventory */}
            {inventoryZoneIds.includes('zone-education') && (
              <ZoneBlock 
                id="zone-education"
                sectionLabel={<LabelBlock type='section'>Education</LabelBlock>}
              >
                <SectionBlock 
                  id="section-mit"
                  company={<LabelBlock>MIT</LabelBlock>}
                  role={<LabelBlock>BS Computer Science</LabelBlock>}
                  location={<LabelBlock>Cambridge, MA</LabelBlock>}
                  dates={<LabelBlock>2020 - 2024</LabelBlock>}
                >
                  <LabelBlock>GPA: 3.8</LabelBlock>
                  <LabelBlock>Relevant Coursework: Algorithms, Systems</LabelBlock>
                </SectionBlock>
              </ZoneBlock> 
            )}
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
                  {baseplateZoneIds.includes('zone-experience') && (
                    <ZoneBlock 
                      id="zone-experience"
                      sectionLabel={<LabelBlock type='section'>Experience</LabelBlock>}
                    >
                      <SectionBlock 
                        id="section-uwaterloo"
                        company={<LabelBlock>University of Waterloo</LabelBlock>}
                        role={<LabelBlock>Software Engineer</LabelBlock>}
                        location={<LabelBlock>Waterloo, ON</LabelBlock>}
                        dates={<LabelBlock>May 2024 - Aug 2024</LabelBlock>}
                      >
                        <LabelBlock>Built resume builder with React</LabelBlock>
                        <LabelBlock>Implemented drag and drop</LabelBlock>
                        <LabelBlock>Learned TypeScript</LabelBlock>
                      </SectionBlock>
                    </ZoneBlock> 
                  )}

                  {/* Render Education Zone if on baseplate */}
                  {baseplateZoneIds.includes('zone-education') && (
                    <ZoneBlock 
                      id="zone-education"
                      sectionLabel={<LabelBlock type='section'>Education</LabelBlock>}
                    >
                      <SectionBlock 
                        id="section-mit"
                        company={<LabelBlock>MIT</LabelBlock>}
                        role={<LabelBlock>BS Computer Science</LabelBlock>}
                        location={<LabelBlock>Cambridge, MA</LabelBlock>}
                        dates={<LabelBlock>2020 - 2024</LabelBlock>}
                      >
                        <LabelBlock>GPA: 3.8</LabelBlock>
                        <LabelBlock>Relevant Coursework: Algorithms, Systems</LabelBlock>
                      </SectionBlock>
                    </ZoneBlock> 
                  )}
                </>
              )}
            </Baseplate>
          </div>
        </div>
      </DndContext>
    </div>
  );

  
}

// ZoneBlock is draggable
// Baseplate is droppable