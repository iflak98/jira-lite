import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BoardService } from '../../../core/services/board.service';
import { Board } from '../../../shared/models/board.model';
import { HeaderComponent } from '../../../shared/ui/header/header';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [CommonModule,HeaderComponent,RouterModule],
  templateUrl: './board-list.html',
  styleUrls: ['./board-list.scss']
})
export class BoardList {
  boards = signal<Board[]>([]);

  constructor(private boardService: BoardService, private router: Router) {
    this.boards.set(this.boardService.getBoards());
  }

 openBoard(board: Board) {
  this.router.navigate(['/boards', board.id]);
}

}
