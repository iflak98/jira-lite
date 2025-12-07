import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { USERS_MOCK } from '../../../core/mocks/users.mock';
import { BoardService } from '../../../core/services/board.service';
import { Board } from '../../../shared/models/board.model';
import { Card, Priority } from '../../../shared/models/card.model';
import { HeaderComponent } from '../../../shared/ui/header/header';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule, FormsModule],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.scss']
})
export class UserManagementComponent implements OnInit {

  users = signal(USERS_MOCK);
  boards = signal<Board[]>([]);

  // ✅ PRIORITIES MUST MATCH Card.priority TYPE
  priorities = signal<Priority[]>(['HIGH', 'MEDIUM', 'LOW']);

  constructor(private boardService: BoardService) {}

  ngOnInit() {
    this.boards.set(this.boardService.getBoards());
  }

  // ✅ Update priority
  updateTaskPriority(cardId: string, priority: Priority) {
    const boards = this.boards();

    boards.forEach(board =>
      board.lists.forEach(list =>
        list.cards.forEach(card => {
          if (card.id === cardId) {
            card.priority = priority;
          }
        })
      )
    );

    this.boards.set([...boards]);
    this.boardService.updateBoards(this.boards());
  }

  // ✅ Get tasks by status
  getUserTasks(
    userId: string,
    status: 'todo' | 'in-progress' | 'done'
  ): Card[] {
    const tasks: Card[] = [];

    this.boards().forEach(board => {
      board.lists.forEach(list => {
        const type = list.title.toLowerCase();

        const match =
          (status === 'todo' && type === 'to do') ||
          (status === 'in-progress' && type === 'in progress') ||
          (status === 'done' && type === 'done');

        if (!match) return;

        list.cards.forEach(card => {
          if (card.assigneeId === userId) {
            tasks.push(card);
          }
        });
      });
    });

    return tasks;
  }

  // ✅ Status moves
  markInProgress(userId: string, cardId: string) {
    this.moveCard(userId, cardId, 'to do', 'in progress');
  }

  markInProgressfromDone(userId: string, cardId: string) {
    this.moveCard(userId, cardId, 'done', 'in progress');
  }

  markAsDone(userId: string, cardId: string) {
    this.moveCard(userId, cardId, 'in progress', 'done');
  }

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

    this.boards.set([...boards]);
    this.boardService.updateBoards(this.boards());
  }
}
