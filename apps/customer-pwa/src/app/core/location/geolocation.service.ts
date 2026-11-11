import { Injectable, signal } from '@angular/core';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  private currentCoords = signal<Coordinates | null>(null);
  readonly coords = this.currentCoords.asReadonly();

  detectLocation(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
          this.currentCoords.set(coords);
          resolve(coords);
        },
        (err) => reject(err),
        { timeout: 10000, enableHighAccuracy: true }
      );
    });
  }
}
