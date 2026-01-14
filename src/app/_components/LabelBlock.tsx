export interface LabelBlockProps {
  id: string;
  label: string;
}

export default function LabelBlock(props: LabelBlockProps) {
  const { id, label } = props;

  // TODO: Render markdown in the label block
  
  return ( 
    <div className={`border-purple-400 border-2`}>
      {label}
  
    </div>
  )
} 