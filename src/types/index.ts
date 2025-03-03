export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO string format
  priority: Priority;
  status: Status;
  createdAt: string; // ISO string format
}

export interface TaskFilter {
  status: Status | 'all';
  priority: Priority | 'all';
  searchQuery: string;
  sortBy: 'dueDate' | 'priority' | 'title';
  sortDirection: 'asc' | 'desc';
}