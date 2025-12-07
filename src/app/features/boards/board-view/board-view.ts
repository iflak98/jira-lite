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

 
  private getStatusFromList(title: string): 'todo' | 'in-progress' | 'done' {
  const t = title.toLowerCase();
  if (t.includes('progress')) return 'in-progress';
  if (t.includes('done')) return 'done';
  return 'todo';
}
drop(event: CdkDragDrop<Card[]>, targetList: List) {
  if (event.previousContainer === event.container) {
    // Reorder inside same list
    moveItemInArray(
      targetList.cards,
      event.previousIndex,
      event.currentIndex
    );
  } else {
    // Move between lists
    const movedCard = event.previousContainer.data[event.previousIndex];

    transferArrayItem(
      event.previousContainer.data,
      targetList.cards,
      event.previousIndex,
      event.currentIndex
    );

    // ✅ Update card status based on new list
    movedCard.status = this.getStatusFromList(targetList.title);
  }

  // ✅ Persist updated boards
  this.boardService.updateBoards(this.boards());
}

}
