import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task, TaskPriority, TaskStatus } from '@/types/task'

interface TaskState {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  filters: {
    status?: TaskStatus
    priority?: TaskPriority
  }
  setFilters: (filters: { status?: TaskStatus; priority?: TaskPriority }) => void
  sortBy: 'dueDate' | 'priority'
  setSortBy: (sortBy: 'dueDate' | 'priority') => void
  getFilteredTasks: () => Task[]
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      searchTerm: '',
      filters: {},
      sortBy: 'dueDate',
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, {
          ...task,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        }]
      })),
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(task =>
          task.id === id ? { ...task, ...updates } : task
        )
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      })),
      setSearchTerm: (term) => set({ searchTerm: term }),
      setFilters: (filters) => set({ filters }),
      setSortBy: (sortBy) => set({ sortBy }),
      getFilteredTasks: () => {
        const { tasks, searchTerm, filters, sortBy } = get()
        return tasks
          .filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              task.description.toLowerCase().includes(searchTerm.toLowerCase())
            
            const matchesStatus = !filters.status || task.status === filters.status
            const matchesPriority = !filters.priority || task.priority === filters.priority
            
            return matchesSearch && matchesStatus && matchesPriority
          })
          .sort((a, b) => {
            if (sortBy === 'dueDate') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            const priorityOrder = { low: 1, medium: 2, high: 3 }
            return priorityOrder[b.priority] - priorityOrder[a.priority]
          })
      }
    }),
    { name: 'task-storage' }
  )
)