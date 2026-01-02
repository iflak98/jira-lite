import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { BoardService } from '../../../core/services/board.service';
import { AuthService } from '../../../core/services/auth.service';
import { Board } from '../../../shared/models/board.model';
import { HeaderComponent } from '../../../shared/ui/header/header';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './board-list.html',
  styleUrls: ['./board-list.scss']
})
export class BoardList {

  boards = signal<Board[]>([]);
  currentUserId = signal<string>('');

  constructor(
    private boardService: BoardService,
    private authService: AuthService,
    private router: Router
  ) {
    // subscribe to the service's boards stream so we update when the async HTTP call returns
    this.boardService.boards$.subscribe(boards => {
      this.boards.set(boards || []);
      console.log('Boards loaded in BoardList (subscribe):', this.boards(),"assigned task",this.getAssignedTaskCount);
    });
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUserId.set(user.id);
    }
  }

  openBoard(board: Board) {
    this.router.navigate(['/boards', board.id]);
  }

  /** ✅ Count tasks assigned to logged-in user */
  getAssignedTaskCount(board: Board): number {
    const userId = this.currentUserId();

    return board.lists.reduce((count, list) => {
      return (
        count +
        list.cards.filter(card => card.assigneeId === userId).length
      );
    }, 0);
  }
}
