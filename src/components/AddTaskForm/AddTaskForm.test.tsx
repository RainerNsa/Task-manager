import { render, screen, fireEvent } from '@testing-library/react'
import AddTaskForm from './AddTaskForm'
import { useTaskStore } from '@/store/taskStore'

test('submits valid form', async () => {
  const mockAdd = jest.fn()
  useTaskStore.mockImplementation(() => ({ addTask: mockAdd }))
  
  render(<AddTaskForm />)
  
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Task' } })
  fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: '2023-08-31' } })
  fireEvent.click(screen.getByRole('button', { name: /add task/i }))
  
  expect(mockAdd).toHaveBeenCalledWith(expect.objectContaining({
    title: 'New Task',
    dueDate: '2023-08-31'
  }))
})

test('shows error when required fields missing', () => {
  render(<AddTaskForm />)
  fireEvent.click(screen.getByRole('button', { name: /add task/i }))
  expect(screen.getByText(/title and due date are required/i)).toBeInTheDocument()
})