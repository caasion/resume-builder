import { useState } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { ZonesData, SectionsData, LabelsData } from '@/lib/types';

export function useResumeDnD() {
  // DATA STORAGE
  const [zones, setZones] = useState<ZonesData>({
    'zone-experience': {
      id: 'zone-experience',
      labelId: 'label-experience',
      sectionIds: ['section-uwaterloo']
    },
    'zone-education': {
      id: 'zone-education',
      labelId: 'label-education',
      sectionIds: ['section-mit']
    }
  });

  const [sections, setSections] = useState<SectionsData>({
    'section-uwaterloo': {
      id: 'section-uwaterloo',
      companyLabelId: 'label-uwaterloo-company',
      roleLabelId: 'label-uwaterloo-role',
      locationLabelId: 'label-uwaterloo-location',
      datesLabelId: 'label-uwaterloo-dates',
      LabelIds: ['label-desc-1'],
    },
    'section-mit': {
      id: 'section-mit',
      companyLabelId: 'label-mit-company',
      roleLabelId: 'label-mit-role',
      locationLabelId: 'label-mit-location',
      datesLabelId: 'label-mit-dates',
      LabelIds: ['label-desc-1'], 
    }
  });

  const [labels, setLabels] = useState<LabelsData>({
    'label-jobrole1': {
      id: 'label-jobrole1',
      label: 'Software Engineer',
    },
    'label-jobrole2': {
      id: 'label-jobrole1',
      label: 'Data Analyst',
    },
  })

  function newZone() {
    const newId = crypto.randomUUID();

    setZones(prev => {
      const newZone = {
        id: newId,
        labelId: "label-new-zone",
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
      companyLabelId: 'label-new-company',
      roleLabelId: 'label-new-role',
      locationLabelId: 'label-new-location',
      datesLabelId: 'label-new-dates',
      LabelIds: [],
    };

    setSections(prev => ({
      ...prev,
      [newId]: newSection,
    }));

    setInventorySectionIds(prev => [...prev, newId]);
  }

  function newLabel() {
    const newId = crypto.randomUUID();
    const newLabel = {
      id: newId,
      label: "New Label"
    };

    setLabels(prev => ({
      ...prev,
      [newId]: newLabel,
    }))

    setInventoryLabelIds(prev => [...prev, newId]);

    return;
  }
 
  // DRAG DATA STORAGE
  const [inventoryZoneIds, setInventoryZoneIds] = useState<string[]>(['zone-experience', 'zone-education']);
  const [inventorySectionIds, setInventorySectionIds] = useState<string[]>([]);
  const [inventoryLabelIds, setInventoryLabelIds] = useState<string[]>([]);
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
      const draggedId = active.id as string;

      if (inventoryZoneIds.includes(draggedId)) {
        setInventoryZoneIds(prev => prev.filter(id => id !== draggedId));
        setBaseplateZoneIds(prev => [...prev, draggedId]);
      }
    }

    // Zone → Inventory
    if (draggedType === 'zone' && over.id === 'inventory') {
      const draggedId = active.id as string;

      if (baseplateZoneIds.includes(draggedId)) {
        setBaseplateZoneIds(prev => prev.filter(id => id !== draggedId));
        setInventoryZoneIds(prev => [...prev, draggedId]);
      }
    }

    // Section → Zone
    if (draggedType === 'section' && overType === 'zone-container') {
      const sectionId = active.id as string;
      const targetZoneId = over.id as string;

      setZones(prev => {
        const updated = { ...prev };
        
        // Remove the sectionID from each zone
        Object.keys(updated).forEach(zoneId => {
          updated[zoneId].sectionIds = updated[zoneId].sectionIds.filter(
            id => id !== sectionId
          );
        });
        
        // Add te sectionID to the target zone
        if (updated[targetZoneId]) {
          updated[targetZoneId].sectionIds.push(sectionId);
        }
        
        return updated;
      });

      // Remove the SectionID from inventory
      setInventorySectionIds(prev => prev.filter(id => id !== sectionId));
    }

    // Section → Inventory
    if (draggedType === 'section' && over.id === 'inventory') {
      const draggedId = active.id as string;

      if (!inventorySectionIds.includes(draggedId)) {
        setInventorySectionIds(prev => [...prev, draggedId]);

        setZones(prev => {
          const updated = { ...prev };
          
          // Remove the sectionID from each zone
          Object.keys(updated).forEach(zoneId => {
            updated[zoneId].sectionIds = updated[zoneId].sectionIds.filter(
              id => id !== draggedId
            );
          });  

          return updated;
        });
      }
    }
  }

  return {
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
  };
}