import Baseplate from './Baseplate';

interface BaseplatePanelProps {
  zoneIds: string[];
  renderZone: (zoneId: string) => React.ReactNode;
}

export default function BaseplatePanel({ zoneIds, renderZone }: BaseplatePanelProps) {
  return (
    <div className="border-2 border-sky-500 p-2">
      <h2>Baseplate</h2>

      <Baseplate>
        {zoneIds.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            Drop zones here
          </div>
        ) : (
          <>
            {zoneIds.map(zoneId => (
              <div key={zoneId}>
                {renderZone(zoneId)}
              </div>
            ))}
          </>
        )}
      </Baseplate>
    </div>
  );
}