'use client'

import { FixedSizeList as List } from 'react-window'
import TaskItem from './TaskItem/TaskItem'
import { Task } from '@/types/task'

const ROW_HEIGHT = 120

const VirtualizedTaskList = ({ tasks }: { tasks: Task[] }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <TaskItem task={tasks[index]} />
    </div>
  )

  return (
    <List
      height={600}
      itemCount={tasks.length}
      itemSize={ROW_HEIGHT}
      width="100%"
    >
      {Row}
    </List>
  )
}

export default VirtualizedTaskList