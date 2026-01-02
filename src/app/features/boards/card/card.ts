import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../shared/ui/header/header';
import { BoardService } from '../../../core/services/board.service';
import { Card as CardModel } from '../../../shared/models/card.model';
import { UserService } from '../../../core/services/user.service';
import { USERS_MOCK } from '../../../core/mocks/users.mock';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
})
export class CardComponent implements OnInit {

  cardDetail = signal<CardModel | null>(null);
  commentInput = signal('');
  hasChanges = signal(false);
  users: any[] = [];

  private boardId!: string;

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const cardId = this.route.snapshot.paramMap.get('cardId');
    this.boardId = this.route.snapshot.paramMap.get('boardId')!;

    if (!cardId || !this.boardId) return;

    const card = this.boardService.getCARDById(this.boardId, cardId);
    if (card) {
      // clone to avoid mutating board directly
      this.cardDetail.set(structuredClone(card));
    }
    // subscribe to users so we can show names in the assignee select
    this.userService.users$.subscribe(u => {
      this.users = u && u.length ? u : USERS_MOCK;

      // if card exists, ensure assigneeName is present
      const current = this.cardDetail();
      if (current && current.assigneeId && !current.assigneeName) {
        const found = this.users.find(x => x.id === current.assigneeId);
        if (found) this.cardDetail.update(c => c ? { ...c, assigneeName: found.name } : c);
      }
    });
  }

  /* ---------------- STATUS ---------------- */
  onStatusChange(status: CardModel['status']) {
    this.cardDetail.update(card =>
      card ? { ...card, status } : card
    );
    this.hasChanges.set(true);
  }

  /* ---------------- ASSIGNEE ---------------- */
  onAssigneeChange(userId: string) {
    const name = this.users.find(u => u.id === userId)?.name ?? null;
    this.cardDetail.update(card =>
      card ? { ...card, assigneeId: userId, assigneeName: name } : card
    );
    this.hasChanges.set(true);
  }

  /* ---------------- COMMENTS ---------------- */
  addComment() {
    if (!this.commentInput().trim()) return;

    this.cardDetail.update(card => {
      if (!card) return card;

      return {
        ...card,
        comments: [
          ...(card.comments ?? []),
          {
            id: crypto.randomUUID(),
            text: this.commentInput(),
            authorId: 'u1', // mock logged-in user
            createdAt: new Date().toISOString()
          }
        ]
      };
    });

    this.commentInput.set('');
    this.hasChanges.set(true);
  }

  /* ---------------- SAVE ---------------- */
  saveChanges() {
    const card = this.cardDetail();
    if (!card) return;

    this.boardService.updateCard(this.boardId, card);
    this.hasChanges.set(false);

    this.goBack();
  }

  /* ---------------- NAVIGATION ---------------- */
  goBack() {
    this.router.navigate(['/boards', this.boardId]);
  }
}
