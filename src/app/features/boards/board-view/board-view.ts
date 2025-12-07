import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
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

    const boardId = Number(this.route.snapshot.paramMap.get('id'));
    const board = boards.find(b => b.id === boardId);
    if (board) this.selectedBoard.set(board);

    // Check current user role and permissions
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUserRole.set(currentUser.roles);
      this.currentUserId.set(currentUser.id);
      
      console.log('👤 Current User:', {
        id: currentUser.id,
        name: currentUser.name,
        roles: currentUser.roles
      });
      
      if (currentUser.roles === 'VIEWER') {
        this.isViewer.set(true);
      }
    }
  }
trackByList(index: number, list: List) {
  return list.id;
}

trackByCard(index: number, card: Card) {
  return card.id;
}

goBack() {
  this.router.navigate(['/boards']);
}

/**
 * Check if card should be visible to the current user
 * - Admins see all cards
 * - Admin-only cards are hidden from non-admins
 * - Assignee-only cards are visible only to assignee or admin
 * - Public cards are visible to everyone
 */
canSeeCard(card: Card): boolean {
  const userRole = this.currentUserRole();
  const userId = this.currentUserId();
  
  console.log('🔍 canSeeCard check:', {
    cardId: card.id,
    cardTitle: card.title,
    cardVisibility: card.visibility,
    userRole,
    userId
  });
  
  // Admins see everything
  if (userRole === 'ADMIN') {
    console.log('✅ Admin user - can see all cards');
    return true;
  }

  // Check card visibility
  const visibility = card.visibility || 'public';
  
  switch (visibility) {
    case 'admin-only':
      console.log('❌ Non-admin user trying to see admin-only card - blocking');
      return false; // Non-admins cannot see admin-only cards
    case 'assignee-only':
      const canSee = card.assigneeId === userId;
      console.log(`${canSee ? '✅' : '❌'} Assignee-only card - can see: ${canSee}`);
      return canSee; // Only assignee can see
    case 'public':
    default:
      console.log('✅ Public card - can see');
      return true; // Everyone can see public cards
  }
}

drop(event: CdkDragDrop<Card[]>, targetList: List) {
  if (event.previousContainer === event.container) {
    moveItemInArray(
      targetList.cards,
      event.previousIndex,
      event.currentIndex
    );
  } else {
    const movedCard = event.previousContainer.data[event.previousIndex];

    transferArrayItem(
      event.previousContainer.data,
      targetList.cards,
      event.previousIndex,
      event.currentIndex
    );

    movedCard.status = this.getStatusFromList(targetList.title);
  }

  this.boardService.updateBoards(this.boards());
}


  private getStatusFromList(title: string): 'todo' | 'in-progress' | 'done' {
    const value = title.toLowerCase();
    if (value.includes('progress')) return 'in-progress';
    if (value.includes('done')) return 'done';
    return 'todo';
  }
}
