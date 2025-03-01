import { act } from '@testing-library/react';
import { useTaskStore } from '@/store/taskStore';

test('adds new task', () => {
  const { result } = renderHook(() => useTaskStore());

  act(() => {
    result.current.addTask({
      title: 'New Task',
      dueDate: '2023-08-31',
      priority: 'high',
    });
  });

  expect(result.current.tasks).toHaveLength(1);
  expect(result.current.tasks[0].title).toBe('New Task');
});

test('filters tasks correctly', () => {
  const { result } = renderHook(() => useTaskStore());

  act(() => {
    result.current.setFilters({ status: 'done' });
  });

  expect(result.current.getFilteredTasks()).toEqual(
    expect.not.arrayContaining([expect.objectContaining({ status: 'todo' })])
  );
});