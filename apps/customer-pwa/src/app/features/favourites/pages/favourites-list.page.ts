import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesStore } from '../state/favourites.store';
import { FavouritesCardComponent } from '../components/favourites-card.component';

@Component({
  selector: 'app-favourites-list-page',
  standalone: true,
  imports: [CommonModule, FavouritesCardComponent],
  templateUrl: './favourites-list.page.html',
  styleUrls: ['./favourites-list.page.scss'],
  providers: [FavouritesStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritesListPageComponent {
  store = inject(FavouritesStore);
}
