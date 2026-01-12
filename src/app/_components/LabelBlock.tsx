interface LabelBlockProps {
    type?: 'bold' | 'italic';
    children: React.ReactNode;
}

export default function LabelBlock(props: LabelBlockProps) {
  const { type, children } = props;

  const specialFont = type == 'bold' ? "text-bold" : (type == 'italic' ? 'text-italic' : '')

  return (
    <div className={`border-purple-400 border-2 ${specialFont}`}>
      {children}
    </div>
  )
}