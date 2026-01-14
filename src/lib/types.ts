interface LegoBlock {
    x: number;
    y: number;
    length: number;
    width: number;
    studded: boolean;
    positioning: 'absolute' | 'relative';
}

// Label block: a block that allows for text
interface LabelData {
    id: string;
    label: string;
}

interface SectionBlockData {
    id: string;
    companyLabelId: string;
    roleLabelId: string;
    locationLabelId: string;
    datesLabelId: string;
    LabelIds: string[];
}

interface ZoneBlockData {
    id: string;
    labelId: string;
    sectionIds: string[];
}

export type LabelsData = Record<string, LabelData>;

export type SectionsData = Record<string, SectionBlockData>;

export type ZonesData = Record<string, ZoneBlockData>





