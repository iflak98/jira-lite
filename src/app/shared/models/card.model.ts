export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Card {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  labels: string[];
  dueDate?: string;
  assigneeId?: string;
  createdAt?: string;
  status: 'todo' | 'in-progress' | 'done';
}


