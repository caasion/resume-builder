import { BaseplateZonesData } from '@/lib/types';
import Baseplate from './Baseplate';

interface BaseplatePanelProps {
  baseplateZones: BaseplateZonesData;
  renderZone: (zoneId: string) => React.ReactNode;
}

export default function BaseplatePanel({ baseplateZones, renderZone }: BaseplatePanelProps) {
  return (
    <div className="border-2 border-sky-500 p-2">
      <h2>Baseplate</h2>

      <Baseplate gridWidth={15} gridLength={20}>
        {Object.values(baseplateZones).map(zoneData => (
          <div
            key={zoneData.id}
            className="pointer-events-auto"
            style={{
              gridColumn: `${zoneData.x + 1} / span ${zoneData.width}`,
              gridRow: `${zoneData.y + 1} / span ${zoneData.length}`,
            }}
          >
            {renderZone(zoneData.id)}
          </div>
        ))}
      </Baseplate>
      
    </div>
  );
} 