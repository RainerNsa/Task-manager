import { render, screen, fireEvent } from '@testing-library/react'
import TaskItem from '@/components/TaskItem'
import { useTaskStore } from '@/store/taskStore'

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  dueDate: '2023-08-20',
  priority: 'medium',
  status: 'todo',
  createdAt: '2023-08-01'
}

test('renders task item and handles interactions', () => {
  const deleteTask = jest.fn()
  useTaskStore.setState({ deleteTask })
  
  render(<TaskItem task={mockTask} />)
  
  expect(screen.getByText('Test Task')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Delete'))
  expect(deleteTask).toHaveBeenCalledWith('1')
})