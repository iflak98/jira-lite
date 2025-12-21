export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type CardVisibility = 'public' | 'admin-only' | 'assignee-only';

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
  visibility?: CardVisibility; // 'public' (default), 'admin-only', 'assignee-only'
  comments?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  authorId: string;
  createdAt: string;
}


