import LabelBlock, { LabelBlockProps } from "./LabelBlock";

interface SectionBlockProps {
  company: React.ReactElement<LabelBlockProps>;
  role: React.ReactElement<LabelBlockProps>;
  location: React.ReactElement<LabelBlockProps>;
  dates: React.ReactElement<LabelBlockProps>;
  children: React.ReactNode;
}

export default function SectionBlock(props: SectionBlockProps) {
  const { company, role, location, dates, children } = props;

  return (
    <div className="bg-red-700 p-2 mb-2">
      <div className="flex justify-between w-ful">
        <LabelBlock>{company}</LabelBlock>
        <LabelBlock>{location}</LabelBlock>
      </div>
      <div className="flex justify-between w-ful">
        <LabelBlock>{role}</LabelBlock>
        <LabelBlock>{dates}</LabelBlock>
      </div>

      {children}
    </div>
  )
}