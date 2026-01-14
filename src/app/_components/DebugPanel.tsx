import { ZonesData, SectionsData, LabelsData } from "@/lib/types";

interface DebugPanelProps {
  zones: ZonesData;
  sections: SectionsData;
  labels: LabelsData;
  inventoryZoneIds: string[];
  inventorySectionIds: string[];
  inventoryLabelIds: string[];
  baseplateZoneIds: string[]
}

export default function DebugPanel({
  zones,
  sections,
  labels,
  inventoryZoneIds,
  inventorySectionIds,
  inventoryLabelIds,
  baseplateZoneIds,
}: DebugPanelProps) {
  return (
    <pre className="text-xs">
      <h1>Zones</h1>
      {JSON.stringify(zones, null, 2)}
      <h1>Sections</h1>
      {JSON.stringify(sections, null, 2)}
      <h1>Labels</h1>
      {JSON.stringify(labels, null, 2)}
      <h1>Inventory Zones</h1>
      {JSON.stringify(inventoryZoneIds, null, 2)}
      <h1>Inventory Sections</h1>
      {JSON.stringify(inventorySectionIds, null, 2)}
      <h1>Inventory Sections</h1>
      {JSON.stringify(inventoryLabelIds, null, 2)}
      <h1>Baseplate Zones</h1>
      {JSON.stringify(baseplateZoneIds, null, 2)}
    </pre>
  )
} 