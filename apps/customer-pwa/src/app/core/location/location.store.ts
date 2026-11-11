import { Injectable, signal } from '@angular/core';

export interface Locality {
  name: string;
  pincode: string;
  latitude: number;
  longitude: number;
}

@Injectable({ providedIn: 'root' })
export class LocationStore {
  private selectedLocalitySignal = signal<Locality>({
    name: 'Dharampeth, Nagpur',
    pincode: '440010',
    latitude: 21.1458,
    longitude: 79.0882
  });

  readonly selectedLocality = this.selectedLocalitySignal.asReadonly();

  setLocality(locality: Locality) {
    this.selectedLocalitySignal.set(locality);
  }
}
