interface LegoBlock {
    x: number;
    y: number;
    length: number;
    width: number;
    studded: boolean;
    positioning: 'absolute' | 'relative';
}

// Label block: a block that allows for text
interface LabelBlock extends LegoBlock {
    positioning: 'relative';

    label: string;
    type: 'normal' | 'bold' | 'italic' | 'list';
}

interface SectionBlock {
    positioning: 'relative';

    label: string;
    children: LabelBlock[];
}

interface ZoneBlock {
    positioning: 'absolute';

    label: LabelBlock;
    children: LabelBlock[];
}

// Baseplate, a unit representing a resume
interface Baseplate {
    positioning: 'absolute'

    zones: ZoneBlock[];
}







