import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../../core/services/board.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { List } from '../../../shared/models/list.model';
import { Card } from '../../../shared/models/card.model';
import { Board } from '../../../shared/models/board.model';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../../shared/ui/header/header';

@Component({
  selector: 'app-board-view',
  standalone: true,
  imports: [CommonModule, DragDropModule,HeaderComponent],
  templateUrl: './board-view.html',
  styleUrls: ['./board-view.scss']
})
export class BoardView implements OnInit {
  // Single board selected, not an array
  boards = signal<Board[]>([]);
  selectedBoard = signal<Board | null>(null);

  lists = computed(() => this.selectedBoard()?.lists || []);

  constructor(private boardService: BoardService, private route: ActivatedRoute) {}

  ngOnInit() {
    const allBoards = this.boardService.getBoards();
    this.boards.set(allBoards);

    const boardId = Number(this.route.snapshot.paramMap.get('id'));
    const board = allBoards.find(b => b.id === boardId) || allBoards[0];
    if (board) this.selectedBoard.set(board);
  }

  drop(event: CdkDragDrop<Card[]>, list: List) {
    if (event.previousContainer === event.container) {
      moveItemInArray(list.cards, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // Update the boards in service
    this.boardService.updateBoards(this.boards());
  }
}
