import { Board } from '../../shared/models/board.model';

export const BOARDS_MOCK: Board[] = [
  {
    id: '1',
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
            assigneeId: 'u2',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          },
          {
            id: 'c1-admin',
            title: 'Design Login Page (Admin Review)',
            description: 'Admin validation of login UI',
            priority: 'LOW',
            labels: ['UI', 'Auth'],
            assigneeId: 'u10',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'admin-only'
          },
          {
            id: 'c2',
            title: 'Create Signup Flow',
            description: 'Signup API + UI screens',
            priority: 'MEDIUM',
            labels: ['Auth', 'API'],
            assigneeId: 'u5',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          }
        ]
      },
      {
        id: 'l2',
        title: 'In Progress',
        cards: [
          {
            id: 'c3',
            title: 'Implement Auth Guard',
            priority: 'MEDIUM',
            labels: ['Angular', 'Guards'],
            assigneeId: 'u2',
            createdAt: new Date().toISOString(),
            status: 'in-progress',
            visibility: 'assignee-only'
          },
          {
            id: 'c4',
            title: 'JWT Token Handling',
            priority: 'HIGH',
            labels: ['Security', 'Auth'],
            assigneeId: 'u6',
            createdAt: new Date().toISOString(),
            status: 'in-progress',
            visibility: 'assignee-only'
          },
          {
            id: 'c4-admin',
            title: 'JWT Token Handling (Admin)',
            priority: 'HIGH',
            labels: ['Security', 'Auth'],
            assigneeId: 'u10',
            createdAt: new Date().toISOString(),
            status: 'in-progress',
            visibility: 'admin-only'
          }
        ]
      },
      {
        id: 'l3',
        title: 'Done',
        cards: [
          {
            id: 'c5',
            title: 'Login UI Completed',
            priority: 'HIGH',
            labels: ['UI'],
            assigneeId: 'u5',
            createdAt: new Date().toISOString(),
            status: 'done',
            visibility: 'assignee-only'
          }
        ]
      }
    ]
  },

  {
    id: '2',
    name: 'Sprint Planning',
    title: 'Sprint Planning Board',
    createdAt: new Date().toISOString(),
    lists: [
      {
        id: 'l4',
        title: 'To Do',
        cards: [
          {
            id: 'c6',
            title: 'Define Sprint Goals',
            priority: 'HIGH',
            labels: ['Sprint'],
            assigneeId: 'u3',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          }
        ]
      }
    ]
  },

  {
    id: '3',
    name: 'Bug Tracking',
    title: 'Bug Tracking Board',
    createdAt: new Date().toISOString(),
    lists: [
      {
        id: 'l7',
        title: 'To Do',
        cards: [
          {
            id: 'c9',
            title: 'Login crash on Safari',
            priority: 'HIGH',
            labels: ['Bug'],
            assigneeId: 'u4',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          }
        ]
      }
    ]
  }
];
