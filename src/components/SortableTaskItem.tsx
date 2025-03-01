import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types/task'; // Import the Task type
import TaskItem from './TaskItem/TaskItem'; // Import the TaskItem component

export const SortableTaskItem = ({ task }: { task: Task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="drag-handle" {...listeners} aria-label="Drag handle">
        ⠿
      </div>
      <TaskItem task={task} />
    </div>
  );
};