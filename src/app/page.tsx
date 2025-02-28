'use client'

import { useTasks } from '@/hooks/useTasks'
import TaskList from '@/components/TaskList'
import AddTaskForm from '@/components/AddTaskForm'
import FilterSortBar from '@/components/FilterSortBar'
import ErrorBoundary from '@/components/ErrorBoundary'

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