import LabelBlock from '@/app/_components/LabelBlock';
import SectionBlock from '@/app/_components/SectionBlock';
import ZoneBlock from '@/app/_components/ZoneBlock';
import { ZonesData, SectionsData } from './types';
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

export function createRenderFunctions(zones: ZonesData, sections: SectionsData) {
  function renderSection(sectionId: string) {
    const section = sections[sectionId];
    
    if (!section) return null;

    return (
      <SectionBlock 
        id={section.id}
        company={<LabelBlock>{section.company}</LabelBlock>}
        role={<LabelBlock>{section.role}</LabelBlock>}
        location={<LabelBlock>{section.location}</LabelBlock>}
        dates={<LabelBlock>{section.dates}</LabelBlock>}
      >
        {section.children.map((desc, index) => (
          <LabelBlock key={index}>{desc}</LabelBlock>
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
        sectionLabel={<LabelBlock type='section'>{zone.label}</LabelBlock>}
      >
        {zone.sectionIds.map(sectionId => (
          <div key={sectionId}>
            {renderSection(sectionId)}
          </div>
        ))} 
      </ZoneBlock>
    );
  }

  return { renderSection, renderZone };
}