// board.model.ts
import { List } from './list.model';
export interface Board {
title: string;
  id: string;
  name: string;
  lists: List[];
   createdAt?: string;
}


