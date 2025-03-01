import { render, screen } from '@testing-library/react'
import TaskList from './TaskList'

const mockTasks = [
  {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    dueDate: '2023-08-20',
    priority: 'medium',
    status: 'todo',
    createdAt: '2023-08-01'
  }
]

test('renders empty state when no tasks', () => {
  render(<TaskList tasks={[]} />)
  expect(screen.getByText(/no tasks found/i)).toBeInTheDocument()
})

test('renders list of tasks', () => {
  render(<TaskList tasks={mockTasks} />)
  expect(screen.getByText(mockTasks[0].title)).toBeInTheDocument()
  expect(screen.getByText(mockTasks[0].description)).toBeInTheDocument()
})