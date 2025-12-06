import { Routes } from '@angular/router';

export const BOARDS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./board-list/board-list').then(m => m.BoardList)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./board-view/board-view').then(m => m.BoardView)
  }
];
