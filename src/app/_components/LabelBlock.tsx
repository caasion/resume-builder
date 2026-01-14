import { useState } from "react";

export interface LabelBlockProps {
  id: string;
  label: string;
  onLabelChange: (id: string, newValue: string) => void;
}

export default function LabelBlock(props: LabelBlockProps) {
  const { id, label, onLabelChange } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(label);

  const handleBlur = () => {
    setIsEditing(false);
    onLabelChange(id, localValue); // Only update parent on blur
  };

  return ( 
    <div className="border-purple-400 border-2">
      {isEditing ? (
        <input 
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div onClick={() => setIsEditing(true)}>{label}</div>
      )}
    </div>
  );
}