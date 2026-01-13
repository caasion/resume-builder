import { ZonesData, SectionsData } from "@/lib/types";

interface DebugPanelProps {
  zones: ZonesData;
  sections: SectionsData;
  inventoryZoneIds: string[];
  inventorySectionIds: string[];
  baseplateZoneIds: string[]
}

export default function DebugPanel({
  zones,
  sections,
  inventoryZoneIds,
  inventorySectionIds,
  baseplateZoneIds,
}: DebugPanelProps) {
  return (
    <pre>
      <h1>Zones</h1>
      {JSON.stringify(zones, null, 2)}
      <h1>Sections</h1>
      {JSON.stringify(sections, null, 2)}
      <h1>Inventory Zones</h1>
      {JSON.stringify(inventoryZoneIds, null, 2)}
      <h1>Inventory Sections</h1>
      {JSON.stringify(inventorySectionIds, null, 2)}
      <h1>Baseplate Zones</h1>
      {JSON.stringify(baseplateZoneIds, null, 2)}
    </pre>
  )
} 