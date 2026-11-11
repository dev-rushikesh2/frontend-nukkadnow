import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketAdapter {
  private socket: WebSocket | null = null;
  private messageSubject = new Subject<any>();

  connect(url: string): Observable<any> {
    this.socket = new WebSocket(url);
    this.socket.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        this.messageSubject.next(parsed);
      } catch (err) {
        console.error('Failed to parse WebSocket message', err);
      }
    };
    return this.messageSubject.asObservable();
  }

  send(data: unknown): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
