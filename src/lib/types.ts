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
    company: string;
    role: string;
    location: string;
    dates: string;
    children: string[];
}

interface ZoneBlockData {
    id: string;
    label: string;
    sectionIds: string[];
}

export type LabelsData = Record<string, LabelData>;

export type SectionsData = Record<string, SectionBlockData>;

export type ZonesData = Record<string, ZoneBlockData>





