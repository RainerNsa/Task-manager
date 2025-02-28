import { useEffect } from 'react'
import { useTaskStore } from '@/store/taskStore'

export const useTasks = () => {
  const { tasks, getFilteredTasks, ...rest } = useTaskStore()
  
  useEffect(() => {
    // Initialization logic if needed
  }, [])

  return {
    tasks: getFilteredTasks(),
    ...rest
  }
}