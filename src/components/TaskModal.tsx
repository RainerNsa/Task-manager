"use client";

import { useState, useEffect } from "react";
import { Task, TaskPriority, TaskStatus } from "@/types/task";
import { useTaskStore } from "@/store/taskStore";
import Modal from "@/components/UI/Modal";
import { format } from "date-fns";

const TaskModal = ({ task, onClose }: { task: Task; onClose: () => void }) => {
  const [editedTask, setEditedTask] = useState(task);
  const { updateTask } = useTaskStore();

  useEffect(() => setEditedTask(task), [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTask(task.id, editedTask);
    onClose();
  };

  return (
    <Modal isOpen={!!task} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>

        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="w-full p-2 border rounded h-32"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Status</label>
            <select
              value={editedTask.status}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  status: e.target.value as TaskStatus,
                })
              }
              className="w-full p-2 border rounded"
            >
              {Object.entries({
                todo: "To Do",
                "in-progress": "In Progress",
                done: "Done",
              }).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Priority</label>
            <select
              value={editedTask.priority}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  priority: e.target.value as TaskPriority,
                })
              }
              className="w-full p-2 border rounded"
            >
              {Object.entries({
                low: "Low",
                medium: "Medium",
                high: "High",
              }).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Due Date</label>
          <input
            type="date"
            value={format(new Date(editedTask.dueDate), "yyyy-MM-dd")}
            onChange={(e) =>
              setEditedTask({ ...editedTask, dueDate: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};
