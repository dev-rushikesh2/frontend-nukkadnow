import { Injectable, inject } from '@angular/core';
import { WebSocketAdapter } from '@nukkadnow/api-client';

@Injectable({ providedIn: 'root' })
export class SocketClientService {
  private ws = inject(WebSocketAdapter);
}
