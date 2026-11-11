import { Injectable } from '@angular/core';
import { QueueBoardViewModel } from '../models/queue-board-view.model';

@Injectable({ providedIn: 'root' })
export class QueueBoardMapper {
  toViewModel(dto: any): QueueBoardViewModel {
    return { ...dto } as any;
  }
}
