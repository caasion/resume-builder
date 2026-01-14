import { useDroppable } from "@dnd-kit/core";

interface InventoryProps {
  children: React.ReactNode
}

export default function Inventory(props: InventoryProps) {
  const { children } = props;

  const { isOver, setNodeRef } = useDroppable({
    id: 'inventory'
  });

  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="h-full">
      {children}
    </div>
  )
} 