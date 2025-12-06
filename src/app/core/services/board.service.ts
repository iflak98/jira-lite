import { Injectable } from '@angular/core';
import { Board } from '../../shared/models/board.model';
import { List } from '../../shared/models/list.model';
import { Card } from '../../shared/models/card.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { BOARDS_MOCK } from '../mocks/boards.mock';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private boardsSubject = new BehaviorSubject<Board[]>([]);
  boards$: Observable<Board[]> = this.boardsSubject.asObservable();

  constructor() {

    this.boardsSubject.next(BOARDS_MOCK);
  }

  getBoards(): Board[] {
    return this.boardsSubject.getValue();
  }

  updateBoards(boards: Board[]) {
    this.boardsSubject.next(boards);
  }
}
