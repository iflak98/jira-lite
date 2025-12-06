export type ActivityType =
  | 'CARD_CREATED'
  | 'CARD_MOVED'
  | 'CARD_UPDATED'
  | 'LIST_CREATED';

export interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  userId: string;
  timestamp: string;
   createdAt?: string;
}
