import { Activity } from '../../shared/models/activity.model';

export const ACTIVITIES_MOCK: Activity[] = [
  {
    id: 'a1',
    type: 'CARD_CREATED',
    message: 'Card "Design Login Page" created',
    userId: 'u1',
    timestamp: new Date().toISOString()
  },
  {
    id: 'a2',
    type: 'CARD_MOVED',
    message: 'Card moved to In Progress',
    userId: 'u2',
    timestamp: new Date().toISOString()
  }
];
