// @/interfaces/Task.ts

export interface Task {
  task_id: string;
  title: string;
  description: string;
  image: string;
  status: TaskStatus;
  deleted: boolean;
  created_at: string; // Changed to string
  updated_at: string; // Changed to string
  deleted_at: string | null; // Changed to string
  user_id: string;
  due_date: string;
}

export enum TaskStatus {
  Todo = 'Todo',
  Progress = 'In Progress',
  Complete = 'Complete',
}