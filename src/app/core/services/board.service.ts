import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Board } from '../../shared/models/board.model';
import { Card } from '../../shared/models/card.model';
import { UserService } from './user.service';
import { environment } from './../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private apiUrl = environment.apiBaseUrl + '/boards';
  private boardsSubject = new BehaviorSubject<Board[]>([]);
  boards$: Observable<Board[]> = this.boardsSubject.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {
    this.loadBoards();

    // Re-enrich boards when user list updates (so assigneeName is populated)
    this.userService.users$.subscribe(() => {
      const current = this.boardsSubject.getValue();
      if (current && current.length) {
        this.enrichBoardsWithUserNames(current);
        this.boardsSubject.next([...current]);
      }
    });
  }

  /* ---------------- BOARDS ---------------- */
  loadBoards(): void {
    this.http.get<Board[]>(this.apiUrl).subscribe(boards => {
      // enrich cards with assigneeName when possible
      this.enrichBoardsWithUserNames(boards);
      this.boardsSubject.next(boards);
    });
  }

  private enrichBoardsWithUserNames(boards: Board[]) {
    const users = this.userService.getUsersSnapshot();
    if (!users || !users.length) return;

    boards.forEach(board => {
      board.lists.forEach(list => {
        list.cards.forEach(card => {
          if (card.assigneeId) {
            const found = users.find(u => u && u.id === card.assigneeId);
            card.assigneeName = card.assigneeName ?? (found ? found.name ?? null : null);
          }
        });
      });
    });
  }

  getBoards(): Board[] {
    console.log('Getting boards:', this.boardsSubject.getValue());
    return this.boardsSubject.getValue();
  }

  updateBoards(boards: Board[]): void {
    boards.forEach(board => {
      this.http.put<Board>(`${this.apiUrl}/${board.id}`, board).subscribe();
    });
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
