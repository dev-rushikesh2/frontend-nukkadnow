import { Injectable, inject } from '@angular/core';
import { WebSocketAdapter } from '@nukkadnow/api-client';
import { AudioAlertService } from './audio-alert.service';

@Injectable({ providedIn: 'root' })
export class MerchantRealtimeService {
  private ws = inject(WebSocketAdapter);
  private audio = inject(AudioAlertService);

  connectOrderInbox(outletId: string) {
    return this.ws.connect(`/merchant/outlets/${outletId}/inbox-stream`);
  }

  notifyNewOrder() {
    this.audio.playNewOrderChime();
  }
}
