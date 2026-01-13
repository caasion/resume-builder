import { useState } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { ZonesData, SectionsData } from '@/lib/types';

export function useResumeDnD() {
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

  const [inventoryZoneIds, setInventoryZoneIds] = useState<string[]>(['zone-experience', 'zone-education']);
  const [baseplateZoneIds, setBaseplateZoneIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const draggedType = active.data.current?.type;
    const overType = over.data.current?.type;

    // Case 1: Zone → Baseplate
    if (over.id === 'baseplate' && draggedType === 'zone') {
      const draggedID = active.id as string;

      if (inventoryZoneIds.includes(draggedID)) {
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
    inventoryZoneIds,
    baseplateZoneIds,
    activeId,
    handleDragStart,
    handleDragEnd,
  };
}