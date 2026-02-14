import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board } from '../../shared/models/board.model';
import { Card } from '../../shared/models/card.model';
import { UserService } from './user.service';
import { BOARDS_MOCK } from '../mocks/boards.mock';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private readonly STORAGE_KEY = 'app_boards';

  private boardsSubject = new BehaviorSubject<Board[]>([]);
  boards$: Observable<Board[]> = this.boardsSubject.asObservable();

  constructor(private userService: UserService) {
    this.loadBoards();

    // Re-enrich boards when users update
    this.userService.users$.subscribe(() => {
      const current = this.boardsSubject.getValue();
      if (current?.length) {
        this.enrichBoardsWithUserNames(current);
        this.persistBoards(current);
        this.boardsSubject.next([...current]);
      }
    });
  }

  /* ---------------- LOAD BOARDS ---------------- */
  loadBoards(): void {
    const savedBoards = localStorage.getItem(this.STORAGE_KEY);

    let boards: Board[];

    if (savedBoards) {
      boards = JSON.parse(savedBoards);
    } else {
      boards = JSON.parse(JSON.stringify(BOARDS_MOCK)); // deep clone
      this.persistBoards(boards);
    }

    this.enrichBoardsWithUserNames(boards);
    this.boardsSubject.next(boards);
  }

  /* ---------------- SAVE TO LOCAL STORAGE ---------------- */
  private persistBoards(boards: Board[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(boards));
  }

  /* ---------------- ENRICH DATA ---------------- */
  private enrichBoardsWithUserNames(boards: Board[]) {
    const users = this.userService.getUsersSnapshot();
    if (!users?.length) return;

    boards.forEach(board => {
      board.lists.forEach(list => {
        list.cards.forEach(card => {
          if (card.assigneeId) {
            const found = users.find(u => u?.id === card.assigneeId);
            card.assigneeName = found?.name ?? null;
          }
        });
      });
    });
  }

  /* ---------------- GET BOARDS ---------------- */
  getBoards(): Board[] {
    return this.boardsSubject.getValue();
  }

  /* ---------------- UPDATE BOARDS ---------------- */
  updateBoards(boards: Board[]): void {
    this.persistBoards(boards);        // 🔥 save to localStorage
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
    board.lists.forEach(list => {
      list.cards = list.cards.filter(c => c.id !== updatedCard.id);
    });

    // Add to correct list
    const targetList = board.lists.find(
      l => this.getStatusFromList(l.title) === updatedCard.status
    );

    if (targetList) {
      targetList.cards.push({ ...updatedCard });
    }

    this.updateBoards(boards);  // persists automatically
  }

  /* ---------------- HELPERS ---------------- */
  private getStatusFromList(title: string): Card['status'] {
    const value = title.toLowerCase();
    if (value.includes('progress')) return 'in-progress';
    if (value.includes('done')) return 'done';
    return 'todo';
  }
}
