import { memo, useRef, useEffect } from 'react'
import { Task } from '@/types/task'
import { useTaskStore } from '@/store/taskStore'
import { TrashIcon, ArrowUpIcon } from '@heroicons/react/24/outline'

const TaskItem = memo(({ task }: { task: Task }) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const { updateTask, deleteTask } = useTaskStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement === itemRef.current) {
        // Open task details
      }
      if (e.key === ' ' && document.activeElement === itemRef.current) {
        e.preventDefault()
        // Toggle task completion
      }
    }

    const element = itemRef.current
    element?.addEventListener('keydown', handleKeyDown)
    return () => element?.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div
      ref={itemRef}
      role="button"
      tabIndex={0}
      aria-label={`Task: ${task.title}. Status: ${task.status}. Priority: ${task.priority}`}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-medium">{task.title}</h3>
          <p className="text-gray-600 mt-1 text-sm">{task.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.status === 'todo' ? 'bg-gray-100 text-gray-800' : task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
              {task.status}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.priority === 'low' ? 'bg-green-100 text-green-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
              {task.priority}
            </span>
            <time className="text-xs text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </time>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => updateTask(task.id, { priority: 'high' })}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Set high priority"
          >
            <ArrowUpIcon className="w-5 h-5 text-red-500" />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Delete task"
          >
            <TrashIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  )
})

TaskItem.displayName = 'TaskItem'
export default TaskItem