/**
 * Represents the status of a task
 * @enum {string}
 */
export type TaskStatus = 'todo' | 'in-progress' | 'done'

/**
 * Represents the priority level of a task
 * @enum {string}
 */
export type TaskPriority = 'low' | 'medium' | 'high'

/**
 * Interface representing a task object
 * @interface
 */
export interface Task {
  /** Unique identifier for the task */
  id: string
  /** Title of the task */
  title: string
  /** Detailed description of the task */
  description: string
  /** Due date in ISO format */
  dueDate: string
  /** Priority level of the task */
  priority: TaskPriority
  /** Current status of the task */
  status: TaskStatus
  /** Creation timestamp in ISO format */
  createdAt: string
}