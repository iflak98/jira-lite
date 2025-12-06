import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ActivityService {
  logs = signal<string[]>([]);

  log(action: string) {
    this.logs.update(l => [...l, `${new Date().toISOString()} - ${action}`]);
  }
}
