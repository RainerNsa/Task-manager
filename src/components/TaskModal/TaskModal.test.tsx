'use client'

import { useState, useEffect } from 'react'
import { Task } from '@/types/task'
import { useTaskStore } from '@/store/taskStore'
import Modal from '@/components/UI/Modal'
import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'

const TaskModal = ({ task, onClose }: { task: Task | null; onClose: () => void }) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null)
  const { updateTask } = useTaskStore()

  useEffect(() => {
    setEditedTask(task)
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editedTask) {
      updateTask(editedTask.id, editedTask)
      onClose()
    }
  }

  if (!editedTask) return null

  return (
    <Modal isOpen={!!task} onClose={onClose} title="Edit Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          value={editedTask.title}
          onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
        />
        
        <Input
          label="Description"
          type="textarea"
          value={editedTask.description}
          onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Status</label>
            <select
              className="w-full p-2 border rounded"
              value={editedTask.status}
              onChange={(e) => setEditedTask({...editedTask, status: e.target.value as TaskStatus})}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Priority</label>
            <select
              className="w-full p-2 border rounded"
              value={editedTask.priority}
              onChange={(e) => setEditedTask({...editedTask, priority: e.target.value as TaskPriority})}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <Input
          label="Due Date"
          type="date"
          value={editedTask.dueDate}
          onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value})}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default TaskModal