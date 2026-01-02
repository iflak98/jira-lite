import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BoardService } from '../../../core/services/board.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { Board } from '../../../shared/models/board.model';
import { HeaderComponent } from '../../../shared/ui/header/header';
import { NgToastComponent, NgToastService,TOAST_POSITIONS} from 'ng-angular-popup';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, RouterModule,NgToastComponent],
  templateUrl: './create-task.html',
  styleUrls: ['./create-task.scss']
})
export class CreateTaskComponent {
  boards: Board[] = [];
  users: any[] = [];
  form: FormGroup;
TOAST_POSITIONS = TOAST_POSITIONS
  constructor(
    private boardService: BoardService,
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private toast: NgToastService,
  ) {
    this.form = this.fb.group({
      boardId: ['', Validators.required],
      listId: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      priority: ['LOW'],
      labels: [''],
      assigneeId: ['', Validators.required]
    });

    this.boardService.boards$.subscribe(boards => {
      this.boards = boards || [];
      if (this.boards.length && !this.form.value.boardId) {
        const firstBoard = this.boards[0];
        this.form.patchValue({ boardId: firstBoard.id, listId: firstBoard.lists?.[0]?.id ?? '' }, { emitEvent: false });
      }
    });

    // load users from backend
    this.userService.users$.subscribe(u => {
      this.users = u || [];
    });

    // when boardId changes, ensure listId is valid
    this.form.get('boardId')?.valueChanges.subscribe((boardId: string) => {
      const board = this.boards.find(b => b.id === boardId);
      const firstListId = board?.lists?.[0]?.id ?? '';
      this.form.patchValue({ listId: firstListId }, { emitEvent: false });
    });
  }

  get lists() {
    const boardId = this.form.value.boardId;
    const board = this.boards.find(b => b.id === boardId);
    return board?.lists ?? [];
  }

  createCard() {
    if (this.form.invalid) return;

    const { boardId, listId, title, description, priority, labels, assigneeId } = this.form.value;

    const boardIndex = this.boards.findIndex(b => b.id === boardId);
    if (boardIndex === -1) return;

    const listIndex = this.boards[boardIndex].lists.findIndex(l => l.id === listId);
    if (listIndex === -1) return;
    // const visibility = ['assignee-only', 'public']
    const newCard = {
      id: `c${Date.now()}`,
      title,
      description,
      priority,
      labels: labels ? labels.split(',').map((s: string) => s.trim()) : [],
      assigneeId: assigneeId ? assigneeId.toLowerCase() : null,
      assigneeName: assigneeId ? (this.users.find((u: any) => u.id === assigneeId)?.name ?? null) : null,
      createdAt: new Date().toISOString(),
      status: 'todo',
      visibility: 'assignee-only'
    } as any;

    this.boards[boardIndex].lists[listIndex].cards.push(newCard);

    // persist via service
    this.boardService.updateBoards(this.boards);

    // reset form fields but keep board/list selection
    this.form.patchValue({ title: '', description: '', priority: 'LOW', labels: '', assigneeId: assigneeId }, { emitEvent: false });

    this.toast.success('Operation successful!', 'Task Created!',2000);
  }
}
