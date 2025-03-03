import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Task, TaskFilter } from '../types';
import useTasks from '../hooks/useTasks';

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  filters: TaskFilter;
  setFilters: React.Dispatch<React.SetStateAction<TaskFilter>>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Task;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
  selectedTaskId: string | null;
  setSelectedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { tasks, addTask, updateTask, deleteTask, getTask, filterTasks } = useTasks();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<TaskFilter>({
    status: 'all',
    priority: 'all',
    searchQuery: '',
    sortBy: 'dueDate',
    sortDirection: 'desc',
  });

  const filteredTasks = useMemo(() => filterTasks(filters), [filterTasks, filters]);

  const value = useMemo(
    () => ({
      tasks,
      filteredTasks,
      filters,
      setFilters,
      addTask,
      updateTask,
      deleteTask,
      getTask,
      selectedTaskId,
      setSelectedTaskId,
    }),
    [
      tasks,
      filteredTasks,
      filters,
      addTask,
      updateTask,
      deleteTask,
      getTask,
      selectedTaskId,
    ]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};