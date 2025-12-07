import { Board } from '../../shared/models/board.model';

export const BOARDS_MOCK: Board[] = [
  {
    id: 1,
    name: 'Product Development',
    title: 'Product Development Board',
    createdAt: new Date().toISOString(),
    lists: [
      {
        id: 'l1',
        title: 'To Do',
        cards: [
          {
            id: 'c1',
            title: 'Design Login Page',
            description: 'Create UI for login screen',
            priority: 'LOW',
            labels: ['UI', 'Auth'],
            dueDate: '2025-01-10',
            assigneeId: 'u2',
            createdAt: new Date().toISOString(),
            status: 'todo'
          }
        ]
      },
      {
        id: 'l2',
        title: 'In Progress',
        cards: [
          {
            id: 'c2',
            title: 'Implement Auth Guard',
            priority: 'MEDIUM',
            labels: ['Angular', 'Guards'],
            assigneeId: 'u2',
            createdAt: new Date().toISOString(),
            status: 'in-progress'
          }
        ]
      },
      {
        id: 'l3',
        title: 'Done',
        cards: [   {
            id: 'c3',
            title: 'Design Login Page',
            description: 'Created UI for login screen',
            priority: 'HIGH',
            labels: ['UI', 'Auth'],
            dueDate: '2025-01-10',
            assigneeId: 'u2',
            createdAt: new Date().toISOString(),
            status: 'todo'
          }]
      }
    ]
  }
];
