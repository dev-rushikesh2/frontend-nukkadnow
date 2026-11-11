import { Injectable, inject } from '@angular/core';
import { WebSocketAdapter } from '@nukkadnow/api-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RealtimeOrderService {
  private ws = inject(WebSocketAdapter);

  listenToOrderUpdates(orderId: string): Observable<any> {
    return this.ws.connect(`/orders/${orderId}/stream`);
  }
}
