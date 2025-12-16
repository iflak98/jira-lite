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
            assigneeId: 'u2',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
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
          },
          {
            id: 'c12',
            title: 'Password Reset Flow',
            priority: 'LOW',
            labels: ['Auth'],
            assigneeId: 'u3',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          },
          {
            id: 'c14',
            title: 'Cross-browser Login Test',
            priority: 'LOW',
            labels: ['Testing'],
            assigneeId: 'u4',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          },
          {
            id: 'c16',
            title: 'Auth Error Handling',
            priority: 'MEDIUM',
            labels: ['Auth'],
            assigneeId: 'u6',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          },
          {
            id: 'c-admin-1',
            title: '[ADMIN] Review Security Audit',
            priority: 'HIGH',
            labels: ['Admin', 'Security'],
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
            id: 'c13',
            title: 'Email Verification UI',
            priority: 'MEDIUM',
            labels: ['UI', 'Auth'],
            assigneeId: 'u3',
            createdAt: new Date().toISOString(),
            status: 'in-progress',
            visibility: 'assignee-only'
          },
          {
            id: 'c15',
            title: 'Accessibility Review',
            priority: 'MEDIUM',
            labels: ['A11y'],
            assigneeId: 'u4',
            createdAt: new Date().toISOString(),
            status: 'in-progress',
            visibility: 'assignee-only'
          },
          {
            id: 'c-admin-2',
            title: '[ADMIN] Update License Agreements',
            priority: 'MEDIUM',
            labels: ['Admin', 'Legal'],
            assigneeId: 'u1',
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
            priority: 'HIGH',
            labels: ['Sprint'],
            assigneeId: 'u3',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          },
          {
            id: 'c7',
            title: 'Estimate Story Points',
            priority: 'MEDIUM',
            labels: ['Estimation'],
            assigneeId: 'u3',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          },
          {
            id: 'c17',
            title: 'Sprint Capacity Planning',
            priority: 'MEDIUM',
            labels: ['Sprint'],
            assigneeId: 'u2',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          },
          {
            id: 'c19',
            title: 'Risk Assessment',
            priority: 'MEDIUM',
            labels: ['Sprint'],
            assigneeId: 'u4',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          },
          {
            id: 'c21',
            title: 'Sprint Metrics Review',
            priority: 'MEDIUM',
            labels: ['Metrics'],
            assigneeId: 'u5',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          },
          {
            id: 'c-admin-3',
            title: '[ADMIN] Plan Q1 Roadmap',
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
            status: 'in-progress',
            visibility: 'assignee-only'
          },
          {
            id: 'c18',
            title: 'Dependency Review',
            priority: 'LOW',
            labels: ['Planning'],
            assigneeId: 'u2',
            createdAt: new Date().toISOString(),
            status: 'in-progress',
            visibility: 'assignee-only'
          },
          {
            id: 'c22',
            title: 'Velocity Analysis',
            priority: 'LOW',
            labels: ['Metrics'],
            assigneeId: 'u6',
            createdAt: new Date().toISOString(),
            status: 'in-progress',
            visibility: 'assignee-only'
          }
        ]
      },
      {
        id: 'l6',
        title: 'Done',
        cards: [
          {
            id: 'c20',
            title: 'Retrospective Notes',
            priority: 'LOW',
            labels: ['Retro'],
            assigneeId: 'u4',
            createdAt: new Date().toISOString(),
            status: 'done',
            visibility: 'assignee-only'
          },
          {
            id: 'c-admin-4',
            title: '[ADMIN] Budget Review',
            priority: 'MEDIUM',
            labels: ['Admin'],
            assigneeId: 'u1',
            createdAt: new Date().toISOString(),
            status: 'done',
            visibility: 'admin-only'
          }
        ]
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
            priority: 'HIGH',
            labels: ['Bug'],
            assigneeId: 'u4',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          },
          {
            id: 'c23',
            title: 'UI Freeze on Scroll',
            priority: 'MEDIUM',
            labels: ['Bug', 'UI'],
            assigneeId: 'u2',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          },
          {
            id: 'c25',
            title: 'Broken Tooltip Styles',
            priority: 'LOW',
            labels: ['Bug', 'CSS'],
            assigneeId: 'u3',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          },
          {
            id: 'c27',
            title: 'Memory Leak Investigation',
            priority: 'HIGH',
            labels: ['Bug', 'Performance'],
            assigneeId: 'u5',
            createdAt: new Date().toISOString(),
            status: 'todo',
            visibility: 'assignee-only'
          },
          {
            id: 'c-admin-5',
            title: '[ADMIN] Investigate Security Incident',
            priority: 'HIGH',
            labels: ['Admin', 'Security'],
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
            priority: 'MEDIUM',
            labels: ['Bug', 'CDK'],
            assigneeId: 'u5',
            createdAt: new Date().toISOString(),
            status: 'in-progress',
            visibility: 'assignee-only'
          },
          {
            id: 'c24',
            title: 'Session Timeout Bug',
            priority: 'HIGH',
            labels: ['Bug', 'Auth'],
            assigneeId: 'u2',
            createdAt: new Date().toISOString(),
            status: 'in-progress',
            visibility: 'assignee-only'
          },
          {
            id: 'c26',
            title: 'Mobile Layout Issue',
            priority: 'MEDIUM',
            labels: ['Bug', 'Responsive'],
            assigneeId: 'u3',
            createdAt: new Date().toISOString(),
            status: 'in-progress',
            visibility: 'assignee-only'
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
            priority: 'LOW',
            labels: ['API'],
            assigneeId: 'u6',
            createdAt: new Date().toISOString(),
            status: 'done',
            visibility: 'assignee-only'
          },
          {
            id: 'c-admin-6',
            title: '[ADMIN] Postmortem Report',
            priority: 'MEDIUM',
            labels: ['Admin'],
            assigneeId: 'u1',
            createdAt: new Date().toISOString(),
            status: 'done',
            visibility: 'admin-only'
          }
        ]
      }
    ]
  }
];
