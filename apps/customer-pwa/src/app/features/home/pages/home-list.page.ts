import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStore } from '../state/home.store';
import { HomeCardComponent } from '../components/home-card.component';

@Component({
  selector: 'app-home-list-page',
  standalone: true,
  imports: [CommonModule, HomeCardComponent],
  templateUrl: './home-list.page.html',
  styleUrls: ['./home-list.page.scss'],
  providers: [HomeStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeListPageComponent {
  store = inject(HomeStore);
}
