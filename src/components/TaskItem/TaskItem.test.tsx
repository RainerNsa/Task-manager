import { render, screen, fireEvent } from '@testing-library/react'
import TaskItem from './TaskItem'
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

test('renders task item correctly', () => {
  render(<TaskItem task={mockTask} />)
  expect(screen.getByText(mockTask.title)).toBeInTheDocument()
  expect(screen.getByText(mockTask.description)).toBeInTheDocument()
})

test('calls deleteTask when delete button clicked', () => {
  const mockDelete = jest.fn()
  useTaskStore.mockImplementation(() => ({ deleteTask: mockDelete }))
  
  render(<TaskItem task={mockTask} />)
  fireEvent.click(screen.getByLabelText(/delete task/i))
  expect(mockDelete).toHaveBeenCalledWith(mockTask.id)
})