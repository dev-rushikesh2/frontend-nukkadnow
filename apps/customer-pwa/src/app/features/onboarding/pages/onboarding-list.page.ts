import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationStore } from '../../../core/location/location.store';

export interface NearbyArea {
  id: string;
  name: string;
  distance: string;
  pincode: string;
}

@Component({
  selector: 'app-onboarding-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './onboarding-list.page.html',
  styleUrls: ['./onboarding-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingListPageComponent implements OnInit {
  private router = inject(Router);
  private locationStore = inject(LocationStore);

  // Steps: 1 = Splash, 2 = Location Access, 3 = Location Selection
  readonly currentStep = signal<number>(1);
  readonly searchQuery = signal<string>('');
  readonly selectedAreaId = signal<string>('civil-lines');

  readonly nearbyAreas = signal<NearbyArea[]>([
    { id: 'civil-lines', name: 'Civil Lines, Amravati', distance: 'Within 2 km', pincode: '444601' },
    { id: 'rajapeth', name: 'Rajapeth, Amravati', distance: 'Within 3 km', pincode: '444605' },
    { id: 'camp', name: 'Camp, Amravati', distance: 'Within 3.5 km', pincode: '444602' },
    { id: 'badnera', name: 'Badnera, Amravati', distance: 'Within 5 km', pincode: '444701' }
  ]);

  ngOnInit() {
    // Automatically transition from splash to location access after 2.8 seconds
    if (this.currentStep() === 1) {
      setTimeout(() => {
        if (this.currentStep() === 1) {
          this.currentStep.set(2);
        }
      }, 2800);
    }
  }

  goToStep(step: number) {
    this.currentStep.set(step);
  }

  requestLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          this.currentStep.set(3);
        },
        () => {
          this.currentStep.set(3);
        }
      );
    } else {
      this.currentStep.set(3);
    }
  }

  selectArea(area: NearbyArea) {
    this.selectedAreaId.set(area.id);
  }

  confirmLocation() {
    const area = this.nearbyAreas().find(a => a.id === this.selectedAreaId());
    if (area) {
      this.locationStore.selectLocality({
        id: area.id,
        name: area.name,
        pincode: area.pincode,
        coordinates: { lat: 20.9374, lng: 77.7796 }
      });
    }
    this.router.navigate(['/home']);
  }

  skipToHome() {
    this.router.navigate(['/home']);
  }
}
