import { BaseplateZoneData, BaseplateZonesData, ZoneBlockData, ZonesData } from '@/lib/types';
import Baseplate from './Baseplate';
import ResizeableBlock from './ResizeableBlock';

interface BaseplatePanelProps {
  zones: ZonesData;
  baseplateZones: BaseplateZonesData;
  renderZone: (zoneId: string) => React.ReactNode;
  onResizeZone: (zoneId: string, updates: Omit<Partial<ZoneBlockData>, "id">) => void;
}

export default function BaseplatePanel({ 
  zones,
  baseplateZones, 
  renderZone,
  onResizeZone,
}: BaseplatePanelProps) {
  const gridWidth = 15;
  const gridLength = 20;

  return (
    <div className="border-2 border-sky-500 p-2">
      <h2>Baseplate</h2>

      <Baseplate gridWidth={gridWidth} gridLength={gridLength}>
        {Object.values(baseplateZones).map(baseplateZoneData => {
          const { id, x, y } = baseplateZoneData;
          const { width, length } = zones[id];

          return (
            <div
              key={id}
              className="pointer-events-auto"
              style={{
                gridColumn: `${x + 1} / span ${width}`,
                gridRow: `${y + 1} / span ${length}`,
              }}
            >
              <ResizeableBlock
                {...baseplateZoneData}
                width={width}
                length={length}
                maxWidth={gridWidth - x}
                maxLength={gridLength - y}
                onResize={(newWidth: number, newLength: number) => onResizeZone(id, { width: newWidth, length: newLength})}
              >
                {renderZone(id)}
              </ResizeableBlock>
            </div>
          )
        }
      )}
      </Baseplate>
      
    </div>
  );
} 