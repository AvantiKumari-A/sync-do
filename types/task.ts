export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  time: string;
  status: 'open' | 'complete';
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  time: string;
}