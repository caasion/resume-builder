'use client';
import LabelBlock from "./_components/LabelBlock";
import SectionBlock from "./_components/SectionBlock";
import ZoneBlock from "./_components/ZoneBlock";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import Baseplate from "./_components/Baseplate";

export default function Home() {
  const [isDropped, setIsDropped] = useState(false);

  return (
    <div className="">
      Resume Builder
      <DndContext onDragEnd={handleDragEnd}>
        <div className='grid grid-cols-2'>
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


            {!isDropped && (
              <ZoneBlock 
                sectionLabel={<LabelBlock type='section'>Zone</LabelBlock>}
              >
                <SectionBlock 
                  company={<LabelBlock>University of Waterloo</LabelBlock>}
                  role={<LabelBlock>Software Engineer</LabelBlock>}
                  location={<LabelBlock>Location</LabelBlock>}
                  dates={<LabelBlock>Dates</LabelBlock>}
                >
                  <LabelBlock>Desc 1</LabelBlock>
                  <LabelBlock>Desc 2</LabelBlock>
                  <LabelBlock>Desc 3</LabelBlock>
                </SectionBlock>
              </ZoneBlock>
            )}
          </div>
          <div className="border-2 border-sky-500 p-2">
            <h2>Baseplate</h2>

            <Baseplate>
              {isDropped ? (
                <ZoneBlock 
                  sectionLabel={<LabelBlock type='section'>Zone</LabelBlock>}
                >
                  <SectionBlock 
                    company={<LabelBlock>University of Waterloo</LabelBlock>}
                    role={<LabelBlock>Software Engineer</LabelBlock>}
                    location={<LabelBlock>Location</LabelBlock>}
                    dates={<LabelBlock>Dates</LabelBlock>}
                  >
                    <LabelBlock>Desc 1</LabelBlock>
                    <LabelBlock>Desc 2</LabelBlock>
                    <LabelBlock>Desc 3</LabelBlock>
                  </SectionBlock>
                </ZoneBlock>
              ) : (
                "Drop here"
              )}
            </Baseplate>
          </div>
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === 'baseplate') {
      setIsDropped(true);
    }
  }
}

// ZoneBlock is draggable
// Baseplate is droppable