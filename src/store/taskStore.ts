import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

// Memoize priority order mapping
const PRIORITY_ORDER: Record<TaskPriority, number> = {
  low: 1,
  medium: 2,
  high: 3
} as const;

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
          id: crypto.randomUUID(), // More reliable than Date.now()
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

      setSearchTerm: (term) => set({ searchTerm: term.trim() }), // Trim whitespace
      setFilters: (filters) => set({ filters }),
      setSortBy: (sortBy) => set({ sortBy }),

      getFilteredTasks: () => {
        const { tasks, searchTerm, filters, sortBy } = get()
        const searchLower = searchTerm.toLowerCase()
        
        // Early return if no tasks
        if (tasks.length === 0) return []
        
        return tasks
          .filter(task => {
            // Skip search filtering if searchTerm is empty
            if (!searchTerm) return true
            
            const matchesSearch = 
              task.title.toLowerCase().includes(searchLower) ||
              task.description.toLowerCase().includes(searchLower)
            
            // Skip status/priority filtering if not set
            const matchesStatus = !filters.status || task.status === filters.status
            const matchesPriority = !filters.priority || task.priority === filters.priority
            
            return matchesSearch && matchesStatus && matchesPriority
          })
          .sort((a, b) => {
            if (sortBy === 'dueDate') {
              // Cache date objects to avoid multiple conversions
              const dateA = new Date(a.dueDate).getTime()
              const dateB = new Date(b.dueDate).getTime()
              return dateA - dateB
            }
            return PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]
          })
      }
    }),
    { 
      name: 'task-storage',
      // Add version for future migrations
      version: 1,
    }
  )
)
