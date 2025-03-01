import { renderHook } from '@testing-library/react'; // Remove `act` from imports
import { useTasks } from '@/hooks/useTasks';
import { useTaskStore } from '@/store/taskStore';

test('returns filtered tasks', () => {
  const mockTasks = [
    { id: '1', title: 'Task 1', status: 'todo' },
    { id: '2', title: 'Task 2', status: 'done' },
  ];

  useTaskStore.mockImplementation((selector) =>
    selector({
      tasks: mockTasks,
      getFilteredTasks: () => mockTasks.filter((t) => t.status === 'done'),
    })
  );

  const { result } = renderHook(() => useTasks());
  expect(result.current.tasks).toHaveLength(1);
  expect(result.current.tasks[0].title).toBe('Task 2');
});