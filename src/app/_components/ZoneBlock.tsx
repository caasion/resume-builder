import { LabelBlockProps } from './LabelBlock';

interface ZoneBlockProps {
  sectionLabel: React.ReactElement<LabelBlockProps>;
  children: React.ReactNode;
}

export default function ZoneBlock(props: ZoneBlockProps) {
  const { sectionLabel, children } = props;

  return (
    <div className="bg-green-600 p-2 mb-2">
      {sectionLabel}

      <hr className="mb-1"></hr>

      {children}

    </div>
  )
}