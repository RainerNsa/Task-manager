import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { useTaskStore } from '@/store/taskStore';

// Define the type for the task store state
interface TaskStoreState {
  tasks: Array<{ id: string; title: string; status: string }>;
  addTask: jest.Mock;
  updateTask: jest.Mock;
  deleteTask: jest.Mock;
  searchTerm: string;
  setSearchTerm: jest.Mock;
  getFilteredTasks: () => Array<{ id: string; title: string; status: string }>;
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  jest.clearAllMocks();
});

jest.mock('@/store/taskStore', () => ({
  __esModule: true,
  useTaskStore: jest.fn(),
}));

beforeEach(() => {
  const mockState: TaskStoreState = {
    tasks: [],
    addTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
    searchTerm: '',
    setSearchTerm: jest.fn(),
    getFilteredTasks: () => [],
  };

  // Cast to unknown first, then to jest.Mock to resolve the type mismatch.
  ((useTaskStore as unknown) as jest.Mock<TaskStoreState>).mockImplementation(() => mockState);
});
