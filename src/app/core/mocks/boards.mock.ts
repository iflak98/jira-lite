import { Board } from '../../shared/models/board.model';

export const BOARDS_MOCK: Board[] = [
  /* ===================== BOARD 1 ===================== */
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
          },
          {
            id: 'c2',
            title: 'Create Signup Flow',
            description: 'Signup API + UI screens',
            priority: 'MEDIUM',
            labels: ['Auth', 'API'],
            dueDate: '2025-01-15',
            assigneeId: 'u5',
            createdAt: new Date().toISOString(),
            status: 'todo'
          },
          {
            id: 'c-admin-1',
            title: '[ADMIN] Review Security Audit',
            description: 'Internal security review required',
            priority: 'HIGH',
            labels: ['Admin', 'Security'],
            dueDate: '2025-01-20',
            assigneeId: 'u1',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'admin-only'
          },
          {
            id: 'c-admin-2',
            title: '[ADMIN] Update License Agreements',
            description: 'Review and update license terms',
            priority: 'MEDIUM',
            labels: ['Admin', 'Legal'],
            assigneeId: 'u1',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'admin-only'
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
            status: 'in-progress'
          },
          {
            id: 'c4',
            title: 'JWT Token Handling',
            description: 'Store & refresh JWT tokens',
            priority: 'HIGH',
            labels: ['Security', 'Auth'],
            assigneeId: 'u6',
            createdAt: new Date().toISOString(),
            status: 'in-progress'
          }
        ]
      },
      {
        id: 'l3',
        title: 'Done',
        cards: [
          {
            id: 'c5',
            title: 'Design Login Page',
            description: 'Created UI for login screen',
            priority: 'HIGH',
            labels: ['UI', 'Auth'],
            dueDate: '2025-01-10',
            assigneeId: 'u2',
            createdAt: new Date().toISOString(),
            status: 'done'
          }
        ]
      }
    ]
  },

  /* ===================== BOARD 2 ===================== */
  {
    id: 2,
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
            description: 'Finalize sprint objectives',
            priority: 'HIGH',
            labels: ['Sprint', 'Planning'],
            assigneeId: 'u3',
            createdAt: new Date().toISOString(),
            status: 'todo'
          },
          {
            id: 'c7',
            title: 'Estimate Story Points',
            priority: 'MEDIUM',
            labels: ['Estimation'],
            assigneeId: 'u3',
            createdAt: new Date().toISOString(),
            status: 'todo'
          },
          {
            id: 'c-admin-3',
            title: '[ADMIN] Plan Q1 Roadmap',
            description: 'Strategic planning for Q1 2026',
            priority: 'HIGH',
            labels: ['Admin', 'Strategy'],
            assigneeId: 'u1',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'admin-only'
          }
        ]
      },
      {
        id: 'l5',
        title: 'In Progress',
        cards: [
          {
            id: 'c8',
            title: 'Prepare Sprint Backlog',
            priority: 'LOW',
            labels: ['Backlog'],
            assigneeId: 'u3',
            createdAt: new Date().toISOString(),
            status: 'in-progress'
          }
        ]
      },
      {
        id: 'l6',
        title: 'Done',
        cards: []
      }
    ]
  },

  /* ===================== BOARD 3 ===================== */
  {
    id: 3,
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
            description: 'App crashes during login on Safari browser',
            priority: 'HIGH',
            labels: ['Bug', 'Safari'],
            assigneeId: 'u4',
            createdAt: new Date().toISOString(),
            status: 'todo'
          },
          {
            id: 'c-admin-4',
            title: '[ADMIN] Investigate Data Breach Report',
            description: 'Review and investigate potential security incident',
            priority: 'HIGH',
            labels: ['Admin', 'Security', 'Critical'],
            assigneeId: 'u1',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'admin-only'
          }
        ]
      },
      {
        id: 'l8',
        title: 'In Progress',
        cards: [
          {
            id: 'c10',
            title: 'Fix Drag & Drop UI glitch',
            description: 'Card overlaps during drag',
            priority: 'MEDIUM',
            labels: ['UI', 'CDK'],
            assigneeId: 'u5',
            createdAt: new Date().toISOString(),
            status: 'in-progress'
          }
        ]
      },
      {
        id: 'l9',
        title: 'Done',
        cards: [
          {
            id: 'c11',
            title: 'Resolve API 401 Error',
            description: 'Unauthorized issue fixed',
            priority: 'LOW',
            labels: ['API', 'Auth'],
            assigneeId: 'u6',
            createdAt: new Date().toISOString(),
            status: 'done'
          }
        ]
      }
    ]
  }
];
