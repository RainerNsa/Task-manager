'use client'

import { useTasks } from '@/hooks/useTasks'
import TaskList from '@/components/TaskList/TaskList'
import AddTaskForm from '@/components/AddTaskForm/AddTaskForm'
import FilterSortBar from '@/components/FilterSortBar/FilterSortBar'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'

export default function Home() {
  const { tasks, searchTerm, setSearchTerm } = useTasks()

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Task Manager</h1>
        
        <div className="mb-8">
          <AddTaskForm />
        </div>

        <FilterSortBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <TaskList tasks={tasks} />
      </div>
    </ErrorBoundary>
  )
}