import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioAlertService {
  private audioContext: AudioContext | null = null;

  playNewOrderAlert() {
    this.playNewOrderChime();
  }

  playNewOrderChime() {
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, this.audioContext.currentTime); // D5
      osc.frequency.setValueAtTime(880, this.audioContext.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start();
      osc.stop(this.audioContext.currentTime + 0.5);
    } catch {
      // Audio autoplay permission fallback
    }
  }
}
