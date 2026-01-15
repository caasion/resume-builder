import { useResumeDnD } from "@/hooks/useResumeDnd";
import Inventory from "./Inventory";
import DisplayBlock from "./DisplayBlock";

interface InventoryPanelProps {
  zoneIds: string[];
  sectionIds: string[];
  labelIds: string[];
  renderZone: (zoneId: string) => React.ReactNode;
  renderSection: (sectionId: string) => React.ReactNode;
  renderLabel: (labelId: string) => React.ReactNode;
  onCreateZone?: () => void;
  onCreateSection?: () => void;
  onCreateLabel?: () => void;
}

export default function InventoryPanel({ 
  zoneIds, 
  sectionIds,
  labelIds,
  renderZone,
  renderSection,
  renderLabel,
  onCreateZone,
  onCreateSection,
  onCreateLabel 
}: InventoryPanelProps) {
  const { zones } = useResumeDnD();

  return (
    <div className="border-2 border-amber-500 p-2">
      <h2>Inventory</h2>

      <div className="flex items-center gap-2 mb-4">
        <button 
          className="px-4 py-2 bg-blue-400" 
          style={{boxShadow: '-3px 3px 0px 0px rgb(30, 64, 175)'}}
          onClick={onCreateZone}
        >
          Create Zone Block
        </button>
        <button 
          className="px-4 py-2 bg-blue-400" 
          style={{boxShadow: '-3px 3px 0px 0px rgb(30, 64, 175)'}}
          onClick={onCreateSection}
        >
          Create Section Block
        </button>
        <button 
          className="px-4 py-2 bg-blue-400" 
          style={{boxShadow: '-3px 3px 0px 0px rgb(30, 64, 175)'}}
          onClick={onCreateLabel}
        >
          Create Label Block
        </button>
      </div>

      <Inventory>
        {zoneIds.map(zoneId => (
          <DisplayBlock 
            key={zoneId}
            width={zones[zoneId].width}
            length={zones[zoneId].length}
          >
            {renderZone(zoneId)}
          </DisplayBlock>
        ))}
        {sectionIds.map(sectionId => (
          <div key={sectionId}>
            {renderSection(sectionId)}
          </div>
        ))}
        {labelIds.map(labelId => (
          <div key={labelId}>
            {renderLabel(labelId)}
          </div>
        ))}
      </Inventory>
      
    </div>
  );
}