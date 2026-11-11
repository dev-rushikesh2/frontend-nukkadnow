import { Injectable, inject } from '@angular/core';
import { QueueBoardApi } from './queue-board.api';
import { QueueBoardMapper } from './queue-board.mapper';
import { Observable, of, map } from 'rxjs';
import { QueueBoardViewModel } from '../models/queue-board-view.model';

@Injectable({ providedIn: 'root' })
export class QueueBoardRepository {
  private api = inject(QueueBoardApi);
  private mapper = inject(QueueBoardMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
