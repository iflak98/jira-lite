import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { USERS_MOCK } from '../../../core/mocks/users.mock';
import { BoardService } from '../../../core/services/board.service';
import { AuthService } from '../../../core/services/auth.service';
import { Board } from '../../../shared/models/board.model';
import { Card, Priority } from '../../../shared/models/card.model';
import { HeaderComponent } from '../../../shared/ui/header/header';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

type TaskWithMeta = Card & {
  boardName: string;
  status: 'todo' | 'in-progress' | 'done';
};

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
  currentUserRole = signal<string>('');

  priorities = signal<Priority[]>(['HIGH', 'MEDIUM', 'LOW']);

  /** ✅ Derived once – NO loops */
  userTasks = computed(() => {
    const map = new Map<string, TaskWithMeta[]>();

    this.boards().forEach(board => {
      board.lists.forEach(list => {

        const status =
          list.title.toLowerCase() === 'to do' ? 'todo' :
          list.title.toLowerCase() === 'in progress' ? 'in-progress' :
          'done';

        list.cards.forEach(card => {
          if (!this.canSeeTask(card)) return;

          const task: TaskWithMeta = {
            ...card,
            boardName: board.name,
            status
          };

          const key = `${card.assigneeId}-${status}`;
          map.set(key, [...(map.get(key) || []), task]);
        });
      });
    });

    return map;
  });

  constructor(
    private boardService: BoardService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.boards.set(this.boardService.getBoards());

    const user = this.authService.getCurrentUser();
    if (user) this.currentUserRole.set(user.roles);
  }

  canSeeTask(card: Card): boolean {
    return this.currentUserRole() === 'ADMIN'
      || (card.visibility ?? 'public') !== 'admin-only';
  }

  getTasks(userId: string, status: TaskWithMeta['status']) {
    return this.userTasks().get(`${userId}-${status}`) || [];
  }

  updateTaskPriority(cardId: string, priority: Priority) {
    const boards = this.boards();

    boards.forEach(b =>
      b.lists.forEach(l =>
        l.cards.forEach(c => {
          if (c.id === cardId) c.priority = priority;
        })
      )
    );

    this.boards.set([...boards]);
    this.boardService.updateBoards(this.boards());
  }

  /* ✅ MOVES */
  markInProgress(cardId: string) {
    this.moveCard(cardId, 'to do', 'in progress');
  }

  markAsDone(cardId: string) {
    this.moveCard(cardId, 'in progress', 'done');
  }

  markInProgressfromDone(cardId: string) {
    this.moveCard(cardId, 'done', 'in progress');
  }

  private moveCard(cardId: string, from: string, to: string) {
    const boards = this.boards();

    boards.forEach(board => {
      const fromList = board.lists.find(l => l.title.toLowerCase() === from);
      const toList = board.lists.find(l => l.title.toLowerCase() === to);

      if (!fromList || !toList) return;

      const index = fromList.cards.findIndex(c => c.id === cardId);
      if (index !== -1) {
        const [card] = fromList.cards.splice(index, 1);
        toList.cards.push(card);
      }
    });

    this.boards.set([...boards]);
    this.boardService.updateBoards(this.boards());
  }

  trackById(_: number, task: { id: string }) {
    return task.id;
  }
}
