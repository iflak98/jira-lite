import { Routes } from '@angular/router';

export const BOARDS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./board-list/board-list').then(m => m.BoardList)
  },
  {
    path: ':boardId/cards/:cardId',
    loadComponent: () =>
      import('./card/card').then(m => m.CardComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./board-view/board-view').then(m => m.BoardView)
  }
];
