import React, { useState, useCallback } from 'react';
import { TaskProvider, useTaskContext } from './context/TaskContext';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import TaskModal from './components/TaskModal';
import ErrorBoundary from './components/ErrorBoundary';
import { Plus, CheckCircle2 } from 'lucide-react';
import { Task } from './types';

const TaskDashboard: React.FC = () => {
  const {
    filteredTasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    getTask,
    selectedTaskId,
    setSelectedTaskId,
  } = useTaskContext();

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isSuccessToastVisible, setIsSuccessToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleFilterChange = useCallback(
    (newFilters: Partial<typeof filters>) => {
      setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    },
    [setFilters]
  );

  const handleTaskClick = useCallback(
    (taskId: string) => {
      setSelectedTaskId(taskId);
    },
    [setSelectedTaskId]
  );

  const handleCloseTaskModal = useCallback(() => {
    setSelectedTaskId(null);
  }, [setSelectedTaskId]);

  const handleSaveTask = useCallback(
    (taskData: Omit<Task, 'id' | 'createdAt'>) => {
      if (selectedTaskId) {
        updateTask(selectedTaskId, taskData);
        showToast('Task updated successfully');
      } else {
        addTask(taskData);
        showToast('Task created successfully');
      }
    },
    [selectedTaskId, updateTask, addTask]
  );

  const handleDeleteTask = useCallback(() => {
    if (selectedTaskId) {
      deleteTask(selectedTaskId);
      showToast('Task deleted successfully');
    }
  }, [selectedTaskId, deleteTask]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsSuccessToastVisible(true);
    setTimeout(() => {
      setIsSuccessToastVisible(false);
    }, 3000);
  };

  const selectedTask = selectedTaskId ? getTask(selectedTaskId) : undefined;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus size={18} className="mr-1" />
            New Task
          </button>
        </div>

        <TaskFilters filters={filters} onFilterChange={handleFilterChange} />

        <TaskList tasks={filteredTasks} onTaskClick={handleTaskClick} />

        {/* New Task Modal */}
        <TaskModal
          isOpen={isNewTaskModalOpen}
          onClose={() => setIsNewTaskModalOpen(false)}
          onSave={(taskData) => {
            addTask(taskData);
            showToast('Task created successfully');
          }}
          isNew={true}
        />

        {/* Edit Task Modal */}
        {selectedTaskId && (
          <TaskModal
            task={selectedTask}
            isOpen={!!selectedTaskId}
            onClose={handleCloseTaskModal}
            onSave={handleSaveTask}
            onDelete={handleDeleteTask}
          />
        )}

        {/* Success Toast */}
        <div
          className={`fixed bottom-4 right-4 bg-green-50 border-l-4 border-green-400 p-4 rounded shadow-md transition-opacity duration-300 ${
            isSuccessToastVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />
            <p className="text-sm text-green-700">{toastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <TaskProvider>
        <TaskDashboard />
      </TaskProvider>
    </ErrorBoundary>
  );
}

export default App;