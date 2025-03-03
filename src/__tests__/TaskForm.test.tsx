import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TaskForm from '../components/TaskForm';

describe('TaskForm', () => {
  const mockOnSubmit = vi.fn();
  
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders with default values', () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  test('renders with initial values', () => {
    const initialValues = {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      dueDate: '2023-12-31T00:00:00.000Z',
      priority: 'high' as const,
      status: 'in-progress' as const,
      createdAt: '2023-01-01T00:00:00.000Z',
    };

    render(<TaskForm onSubmit={mockOnSubmit} initialValues={initialValues} buttonText="Update Task" />);
    
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2023-12-31')).toBeInTheDocument();
    expect(screen.getByDisplayValue('high')).toBeInTheDocument();
    expect(screen.getByDisplayValue('in-progress')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update task/i })).toBeInTheDocument();
  });

  test('validates required fields', () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);
    
    // Clear the title field
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: '' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    // Check that validation error is shown
    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    
    // Check that onSubmit was not called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('submits form with valid data', () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Task Description' } });
    
    const today = new Date().toISOString().split('T')[0];
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: today } });
    
    fireEvent.change(screen.getByLabelText(/priority/i), { target: { value: 'high' } });
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'todo' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    // Check that onSubmit was called with the correct data
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'New Task',
      description: 'Task Description',
      dueDate: expect.any(String), // ISO string format
      priority: 'high',
      status: 'todo',
    });
  });
});