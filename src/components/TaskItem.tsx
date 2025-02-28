import { memo } from 'react'
import { Task } from '@/types/task'
import { useTaskStore } from '@/store/taskStore'
import { ArrowUpIcon, TrashIcon } from '@heroicons/react/24/outline'

interface TaskItemProps {
  task: Task
}

const TaskItem = memo(({ task }: TaskItemProps) => {
  const { updateTask, deleteTask } = useTaskStore()

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    done: 'bg-green-100 text-green-800'
  }

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  }

  return (
    <article className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-medium">{task.title}</h3>
          <p className="text-gray-600 mt-1 text-sm">{task.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
              {task.status}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
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
    </article>
  )
})

TaskItem.displayName = 'TaskItem'
export default TaskItem