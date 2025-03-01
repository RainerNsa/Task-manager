import { memo, useMemo } from 'react'
import TaskItem from '@/components/TaskItem/TaskItem'
import { Task } from '@/types/task'

interface TaskListProps {
  tasks: Task[]
}

const TaskList = memo(({ tasks }: TaskListProps) => {
  const memoizedTasks = useMemo(() => tasks, [tasks])

  return (
    <section aria-label="Task list" className="grid gap-4">
      {memoizedTasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tasks found</p>
      ) : (
        memoizedTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))
      )}
    </section>
  )
})

TaskList.displayName = 'TaskList'
export default TaskList