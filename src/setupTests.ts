import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
  localStorage.clear()
  jest.clearAllMocks()
})

jest.mock('@/store/taskStore', () => ({
  __esModule: true,
  useTaskStore: jest.fn(),
}))

beforeEach(() => {
  const { useTaskStore } = require('@/store/taskStore')
  useTaskStore.mockImplementation((selector: any) => selector({
    tasks: [],
    addTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
    searchTerm: '',
    setSearchTerm: jest.fn(),
    getFilteredTasks: () => [],
  }))
})