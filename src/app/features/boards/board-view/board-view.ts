import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  DragDropModule
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';

import { BoardService } from '../../../core/services/board.service';
import { AuthService } from '../../../core/services/auth.service';
import { Board } from '../../../shared/models/board.model';
import { List } from '../../../shared/models/list.model';
import { Card } from '../../../shared/models/card.model';
import { HeaderComponent } from '../../../shared/ui/header/header';

@Component({
  selector: 'app-board-view',
  standalone: true,
  imports: [CommonModule, DragDropModule, HeaderComponent],
  templateUrl: './board-view.html',
  styleUrls: ['./board-view.scss']
})
export class BoardView implements OnInit {

  boards = signal<Board[]>([]);
  selectedBoard = signal<Board | null>(null);
  lists = computed(() => this.selectedBoard()?.lists ?? []);

  isViewer = signal(false);
  currentUserRole = signal<string>('');
  currentUserId = signal<string>('');

  constructor(
    private boardService: BoardService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const boards = this.boardService.getBoards();
    this.boards.set(boards);

    const boardId = this.route.snapshot.paramMap.get('id');
    const board = boards.find(b => b.id === boardId);
    if (board) this.selectedBoard.set(board);

    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUserRole.set(currentUser.roles);
      this.currentUserId.set(currentUser.id);
      this.isViewer.set(currentUser.roles === 'VIEWER');
    }
  }

  trackByList(_: number, list: List) {
    return list.id;
  }

  trackByCard(_: number, card: Card) {
    return card.id;
  }

  goBack() {
    this.router.navigate(['/boards']);
  }

  /** Get visible cards for current user */
  getVisibleCards(list: List): Card[] {
    const userRole = this.currentUserRole();
    const userId = this.currentUserId();

    // if (userRole === 'ADMIN') {
    //   // Admin sees all cards in the list
    //   return list.cards;
    // }
    // Non-admin sees only their assigned tasks
    return list.cards.filter(card => card.assigneeId === userId);
  }

  /** Check if a card can be dragged */
  canDragCard(card: Card): boolean {
    if (this.isViewer()) return false;
    const userRole = this.currentUserRole();
    const userId = this.currentUserId();
    return userRole === 'ADMIN' || card.assigneeId === userId;
  }

  /** Handle drag & drop */
  drop(event: CdkDragDrop<Card[]>, targetList: List) {
    if (this.isViewer()) return;

    const movedCard = event.item.data;

    // Find the list where this card currently exists
    const previousList = this.selectedBoard()?.lists.find(l => l.cards.includes(movedCard));
    if (!previousList) return;

    if (event.previousContainer === event.container) {
      // Rearrange within the same list
      moveItemInArray(targetList.cards, event.previousIndex, event.currentIndex);
    } else {
      // Remove from previous list and insert into target
      const indexInPrev = previousList.cards.indexOf(movedCard);
      if (indexInPrev > -1) previousList.cards.splice(indexInPrev, 1);

      targetList.cards.splice(event.currentIndex, 0, movedCard);

      // Update status based on target list
      movedCard.status = this.getStatusFromList(targetList.title);
    }

    // Persist changes
    this.boardService.updateBoards(this.boards());
  }

  /** Map list title to task status */
  private getStatusFromList(title: string): 'todo' | 'in-progress' | 'done' {
    const value = title.toLowerCase();
    if (value.includes('progress')) return 'in-progress';
    if (value.includes('done')) return 'done';
    return 'todo';
  }
  /** Open card details - placeholder for future implementation */
  openCardDetails(card: Card) {
    console.log('Open details for card:', card);
    // Placeholder: Implement card detail view logic here
    this.router.navigate(['/boards', this.selectedBoard()?.id, 'cards', card.id]);
  }
}
