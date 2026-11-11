import { Injectable, signal, inject } from '@angular/core';
import { QueueBoardRepository } from '../data-access/queue-board.repository';
import { QueueBoardViewModel } from '../models/queue-board-view.model';

@Injectable()
export class QueueBoardStore {
  private repo = inject(QueueBoardRepository);

  readonly items = signal<QueueBoardViewModel[]>([]);
  readonly loading = signal<boolean>(false);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.repo.getList().subscribe({
      next: (data) => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
