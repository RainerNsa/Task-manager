// Create components/SortableTaskItem.tsx
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export const SortableTaskItem = ({ task }: { task: Task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="drag-handle" {...listeners} aria-label="Drag handle">
        ⠿
      </div>
      <TaskItem task={task} />
    </div>
  )
}

// Update components/TaskList.tsx
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskItem from './TaskItem'

const TaskList = ({ tasks }) => {
  const { updateTaskOrder } = useTaskStore()

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex(t => t.id === active.id)
      const newIndex = tasks.findIndex(t => t.id === over.id)
      updateTaskOrder(oldIndex, newIndex)
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map(task => (
          <SortableTaskItem key={task.id} task={task} />
        ))}
      </SortableContext>
    </DndContext>
  )
}

// Update store/taskStore.ts
interface TaskState {
  // Add to existing store
  updateTaskOrder: (oldIndex: number, newIndex: number) => void
}

// In store creation
updateTaskOrder: (oldIndex, newIndex) => set((state) => {
  const newTasks = [...state.tasks]
  const [movedTask] = newTasks.splice(oldIndex, 1)
  newTasks.splice(newIndex, 0, movedTask)
  return { tasks: newTasks }
})