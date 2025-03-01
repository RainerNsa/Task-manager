import { useEffect } from 'react';
import { useTaskStore } from '@/store/taskStore';

export const useTasks = () => {
  const { getFilteredTasks, ...rest } = useTaskStore(); // Remove `tasks` from destructuring

  useEffect(() => {
    // Initialization logic if needed
  }, []);

  return {
    tasks: getFilteredTasks(),
    ...rest,
  };
};