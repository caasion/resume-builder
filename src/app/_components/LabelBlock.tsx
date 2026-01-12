export interface LabelBlockProps {
    type?: 'bold' | 'italic' | 'section';
    children: React.ReactNode;
}

export default function LabelBlock(props: LabelBlockProps) {
  const { type, children } = props;

  const specialFont = type 
    ? type == 'bold' || type == 'italic'
      ? "font-" + type 
      : type == 'section' 
        ? 'text-2xl' 
        : ''
    : '';

  return (
    <div className={`border-purple-400 border-2 ${specialFont}`}>
      {children}
    </div>
  )
} 