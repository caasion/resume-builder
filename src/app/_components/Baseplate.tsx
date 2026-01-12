import { useDroppable } from "@dnd-kit/core";

interface BaseplateProps {
  children: React.ReactNode
}

export default function Baseplate(props: BaseplateProps) {
  const { children } = props;

  const { isOver, setNodeRef } = useDroppable({
    id: 'baseplate'
  });

  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  )
} 