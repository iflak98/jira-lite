import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { USERS_MOCK } from '../../../core/mocks/users.mock';
import { BoardService } from '../../../core/services/board.service';
import { Board } from '../../../shared/models/board.model';
import { Card } from '../../../shared/models/card.model';
import { HeaderComponent } from '../../../shared/ui/header/header';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.scss']
})
export class UserManagementComponent implements OnInit {

  users = signal(USERS_MOCK);
  boards = signal<Board[]>([]);

  constructor(private boardService: BoardService) {}

  ngOnInit() {
    this.boards.set(this.boardService.getBoards());
  }

  // ✅ Get tasks by status
  getUserTasks(
    userId: string,
    status: 'todo' | 'in-progress' | 'done'
  ): Card[] {
    const tasks: Card[] = [];

    this.boards().forEach(board => {
      board.lists.forEach(list => {
        const listType = list.title.toLowerCase();

        const matchesStatus =
          (status === 'todo' && listType === 'to do') ||
          (status === 'in-progress' && listType === 'in progress') ||
          (status === 'done' && listType === 'done');

        if (!matchesStatus) return;

        list.cards.forEach(card => {
          if (card.assigneeId === userId) {
            tasks.push(card);
          }
        });
      });
    });

    return tasks;
  }

  // ✅ Move To Do → In Progress
  markInProgress(userId: string, cardId: string, ) {
    this.moveCard(userId, cardId, 'to do', 'in progress');
  }
    // ✅ Move To Do → In Progress
  markInProgressfromDone(userId: string, cardId: string, ) {
    this.moveCard(userId, cardId, 'done', 'in progress');
  }

  // ✅ Move In Progress → Done
  markAsDone(userId: string, cardId: string, ) {
    this.moveCard(userId, cardId, 'in progress', 'done');
  }

  // ✅ Generic card mover
  private moveCard(
    userId: string,
    cardId: string,
    fromList: string,
    toList: string
  ) {
    const boards = this.boards();

    boards.forEach(board => {
      const from = board.lists.find(l => l.title.toLowerCase() === fromList);
      const to = board.lists.find(l => l.title.toLowerCase() === toList);

      if (!from || !to) return;

      const index = from.cards.findIndex(
        c => c.id === cardId && c.assigneeId === userId
      );

      if (index > -1) {
        const [card] = from.cards.splice(index, 1);
        to.cards.push(card);
      }
    });

    this.boards.set([...boards]); // ✅ trigger signal update
    this.boardService.updateBoards(this.boards());
  }
}
