'use client';

import { useTaskStore } from '@/store/taskStore';
import { Input } from '@/components/UI/Input';

// Define the TaskStatus type
type TaskStatus = 'todo' | 'in-progress' | 'done';

interface FilterSortBarProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

const FilterSortBar = ({ searchTerm, onSearchChange }: FilterSortBarProps) => {
  const { filters, setFilters, sortBy, setSortBy } = useTaskStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Search Tasks"
          value={searchTerm || ''}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search by title or description..."
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium">Filter by</label>
          <div className="flex gap-2">
            <select
              className="w-full p-2 border rounded"
              value={filters.status || ''}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value as TaskStatus })
              }
            >
              <option value="">All Statuses</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Sort by</label>
          <select
            className="w-full p-2 border rounded"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as 'dueDate' | 'priority')
            }
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSortBar;