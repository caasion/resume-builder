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

export interface ZoneBlockData {
    id: string;
    length: number;
    width: number;

    labelId: string;
    sectionIds: string[];
}

export type LabelsData = Record<string, LabelData>;

export type SectionsData = Record<string, SectionBlockData>;

export type ZonesData = Record<string, ZoneBlockData>

export interface BaseplateZoneData {
    id: string;
    x: number;
    y: number;
}

export type BaseplateZonesData = Record<string, BaseplateZoneData>;

