import LabelBlock from '@/app/_components/LabelBlock';
import SectionBlock from '@/app/_components/SectionBlock';
import ZoneBlock from '@/app/_components/ZoneBlock';
import { ZonesData, SectionsData, LabelsData } from './types';

export function createRenderFunctions(zones: ZonesData, sections: SectionsData, labels: LabelsData) {
  function renderLabel(labelId: string) {
    const label = labels[labelId];

    if (!label) return null;

    return (
      <LabelBlock
        id={label.id}
        label={label.id}
      />
    )
  }

  function renderSection(sectionId: string) {
    const section = sections[sectionId];
    
    if (!section) return null;

    return (
      <SectionBlock 
        id={section.id}
        company={renderLabel(section.companyLabelId)}
        role={renderLabel(section.roleLabelId)}
        location={renderLabel(section.locationLabelId)}
        dates={renderLabel(section.datesLabelId)}
      >
        {section.LabelIds.map((labelId) => (
          <div key={labelId}>
            {renderLabel(labelId)}
          </div>
        ))}
      </SectionBlock>
    );
  }

  function renderZone(zoneId: string) {
    const zone = zones[zoneId];
    
    if (!zone) return null;

    return (
      <ZoneBlock 
        id={zone.id}
        sectionLabel={renderLabel(zone.labelId)}
      >
        {zone.sectionIds.map(sectionId => (
          <div key={sectionId}>
            {renderSection(sectionId)}
          </div>
        ))} 
      </ZoneBlock>
    );
  }

  return { renderSection, renderZone, renderLabel };
}