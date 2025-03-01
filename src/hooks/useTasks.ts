import { useEffect } from 'react';
import { useTaskStore } from '@/store/taskStore';

export const useTasks = () => {
  // Rename `tasks` to `originalTasks` during destructuring
  const { tasks: originalTasks, getFilteredTasks, ...rest } = useTaskStore();

  useEffect(() => {
    // Initialization logic if needed
  }, []);

  return {
    tasks: getFilteredTasks(), // Explicitly return filtered tasks
    originalTasks, // Include the original tasks if needed
    ...rest, // Spread the remaining properties
  };
};