import { useState } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { ZonesData, SectionsData } from '@/lib/types';

export function useResumeDnD() {
  // DATA STORAGE
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

  function newZone() {
    const newId = crypto.randomUUID();

    setZones(prev => {
      const newZone = {
        id: newId,
        label: "New Zone",
        sectionIds: [],
      }

      return {
        ...prev,
        [newId]: newZone,
      };
    });

    setInventoryZoneIds(prev => [...prev, newId]);
  }

  function newSection() {
    const newId = crypto.randomUUID();
    const newSection = {
      id: newId,
      company: 'New Company',
      role: 'New Role',
      location: 'Location',
      dates: 'Dates',
      children: [],
    };

    setSections(prev => ({
      ...prev,
      [newId]: newSection
    }));
  }

  function newLabel() {
    const newId = crypto.randomUUID();

    console.log("New label not implemeneted")
    return;
  }
 
  // DRAG DATA STORAGE
  const [inventoryZoneIds, setInventoryZoneIds] = useState<string[]>(['zone-experience', 'zone-education']);
  const [baseplateZoneIds, setBaseplateZoneIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // DRAG EVENTS
  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const draggedType = active.data.current?.type;
    const overType = over.data.current?.type;

    // Zone → Baseplate
    if (draggedType === 'zone' && over.id === 'baseplate') {
      const draggedID = active.id as string;

      if (inventoryZoneIds.includes(draggedID)) {
        setInventoryZoneIds(prev => prev.filter(id => id !== draggedID));
        setBaseplateZoneIds(prev => [...prev, draggedID]);
      }
    }

    // Zone → Inventory
    if (draggedType === 'zone' && over.id === 'inventory') {
      const draggedID = active.id as string;

      if (baseplateZoneIds.includes(draggedID)) {
        setBaseplateZoneIds(prev => prev.filter(id => id !== draggedID));
        setInventoryZoneIds(prev => [...prev, draggedID]);
      }
    }

    // Case 2: Section → Zone
    if (draggedType === 'section' && overType === 'zone-container') {
      const sectionId = active.id as string;
      const targetZoneId = over.id as string;

      setZones(prev => {
        const updated = { ...prev };
        
        Object.keys(updated).forEach(zoneId => {
          updated[zoneId].sectionIds = updated[zoneId].sectionIds.filter(
            id => id !== sectionId
          );
        });
        
        if (updated[targetZoneId]) {
          updated[targetZoneId].sectionIds.push(sectionId);
        }
        
        return updated;
      });
    }
  }

  return {
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
  };
}