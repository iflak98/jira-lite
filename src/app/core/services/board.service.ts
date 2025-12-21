import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board } from '../../shared/models/board.model';
import { Card } from '../../shared/models/card.model';
import { BOARDS_MOCK } from '../mocks/boards.mock';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private boardsSubject = new BehaviorSubject<Board[]>([]);
  boards$: Observable<Board[]> = this.boardsSubject.asObservable();

  constructor() {
    // initialize mock data
    this.boardsSubject.next(structuredClone(BOARDS_MOCK));
  }

  /* ---------------- BOARDS ---------------- */

  getBoards(): Board[] {
    return this.boardsSubject.getValue();
  }

  updateBoards(boards: Board[]): void {
    this.boardsSubject.next([...boards]);
  }

  /* ---------------- GET CARD ---------------- */

  getCARDById(boardId: string, cardId: string): Card | null {
    const board = this.getBoards().find(b => b.id === boardId);
    if (!board) return null;

    for (const list of board.lists) {
      const card = list.cards.find(c => c.id === cardId);
      if (card) return card;
    }
    return null;
  }

  /* ---------------- UPDATE CARD ---------------- */

  updateCard(boardId: string, updatedCard: Card): void {
    const boards = this.getBoards();
    const board = boards.find(b => b.id === boardId);
    if (!board) return;

    // Remove card from all lists
    for (const list of board.lists) {
      list.cards = list.cards.filter(c => c.id !== updatedCard.id);
    }

    // Add card to correct list based on status
    const targetList = board.lists.find(
      l => this.getStatusFromList(l.title) === updatedCard.status
    );

    if (targetList) {
      targetList.cards.push({ ...updatedCard });
    }

    this.updateBoards(boards);
  }

  /* ---------------- HELPERS ---------------- */

  private getStatusFromList(title: string): Card['status'] {
    const value = title.toLowerCase();
    if (value.includes('progress')) return 'in-progress';
    if (value.includes('done')) return 'done';
    return 'todo';
  }
}
