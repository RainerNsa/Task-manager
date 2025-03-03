import { useMemo } from 'react';
import { Task, TaskFilter } from '../types';
import useLocalStorage from './useLocalStorage';

const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    
    setTasks((prevTasks) => [...prevTasks, newTask]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const getTask = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  const filterTasks = (filters: TaskFilter) => {
    return useMemo(() => {
      let filteredTasks = [...tasks];

      // Filter by status
      if (filters.status !== 'all') {
        filteredTasks = filteredTasks.filter((task) => task.status === filters.status);
      }

      // Filter by priority
      if (filters.priority !== 'all') {
        filteredTasks = filteredTasks.filter((task) => task.priority === filters.priority);
      }

      // Search by title or description
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredTasks = filteredTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query)
        );
      }

      // Sort tasks
      filteredTasks.sort((a, b) => {
        if (filters.sortBy === 'dueDate') {
          return filters.sortDirection === 'asc'
            ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        } else if (filters.sortBy === 'priority') {
          const priorityOrder = { low: 1, medium: 2, high: 3 };
          return filters.sortDirection === 'asc'
            ? priorityOrder[a.priority] - priorityOrder[b.priority]
            : priorityOrder[b.priority] - priorityOrder[a.priority];
        } else {
          // Sort by title
          return filters.sortDirection === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
      });

      return filteredTasks;
    }, [tasks, filters]);
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTask,
    filterTasks,
  };
};

export default useTasks;