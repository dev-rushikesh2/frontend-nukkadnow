import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscoveryStore } from '../state/discovery.store';
import { DiscoveryCardComponent } from '../components/discovery-card.component';

@Component({
  selector: 'app-discovery-list-page',
  standalone: true,
  imports: [CommonModule, DiscoveryCardComponent],
  templateUrl: './discovery-list.page.html',
  styleUrls: ['./discovery-list.page.scss'],
  providers: [DiscoveryStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscoveryListPageComponent {
  store = inject(DiscoveryStore);
}
