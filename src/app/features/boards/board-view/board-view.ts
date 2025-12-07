import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule
} from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';

import { BoardService } from '../../../core/services/board.service';
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

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const boards = this.boardService.getBoards();
    this.boards.set(boards);

    const boardId = Number(this.route.snapshot.paramMap.get('id'));
    const board = boards.find(b => b.id === boardId);
    if (board) this.selectedBoard.set(board);
  }
trackByList(index: number, list: List) {
  return list.id;
}

trackByCard(index: number, card: Card) {
  return card.id;
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
