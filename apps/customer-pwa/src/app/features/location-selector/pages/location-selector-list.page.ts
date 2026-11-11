import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationSelectorStore } from '../state/location-selector.store';
import { LocationSelectorCardComponent } from '../components/location-selector-card.component';

@Component({
  selector: 'app-location-selector-list-page',
  standalone: true,
  imports: [CommonModule, LocationSelectorCardComponent],
  templateUrl: './location-selector-list.page.html',
  styleUrls: ['./location-selector-list.page.scss'],
  providers: [LocationSelectorStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationSelectorListPageComponent {
  store = inject(LocationSelectorStore);
}
