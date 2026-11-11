import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  text: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private messagesSignal = signal<ToastMessage[]>([]);
  readonly messages = this.messagesSignal.asReadonly();

  show(text: string, type: ToastMessage['type'] = 'info', durationMs = 4000) {
    const id = Math.random().toString(36).substring(2, 9);
    this.messagesSignal.update(msgs => [...msgs, { id, type, text }]);
    setTimeout(() => this.dismiss(id), durationMs);
  }

  dismiss(id: string) {
    this.messagesSignal.update(msgs => msgs.filter(m => m.id !== id));
  }
}
