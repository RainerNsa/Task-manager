'use client'

import { useState } from 'react'
import { useTaskStore } from '@/store/taskStore'
import { TaskPriority } from '@/types/task'
import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'

const AddTaskForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [error, setError] = useState('')
  const { addTask } = useTaskStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !dueDate) {
      setError('Title and due date are required')
      return
    }
    
    addTask({
      title,
      description,
      dueDate,
      priority,
      status: 'todo'
    })
    
    // Reset form
    setTitle('')
    setDescription('')
    setDueDate('')
    setPriority('medium')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <div className="space-y-4">
        <Input
          label="Title *"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <Input
          label="Description"
          id="description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Due Date *"
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Priority</label>
            <select
              className="w-full p-2 border rounded"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full">
          Add Task
        </Button>
      </div>
    </form>
  )
}

export default AddTaskForm