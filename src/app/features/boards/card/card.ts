import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../shared/ui/header/header';
import { BoardService } from '../../../core/services/board.service';
import { Card as CardModel } from '../../../shared/models/card.model';

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

  private boardId!: string;

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router
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
    this.cardDetail.update(card =>
      card ? { ...card, assigneeId: userId } : card
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
