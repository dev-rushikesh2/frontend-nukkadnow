import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesStore } from '../state/categories.store';
import { CategoriesCardComponent } from '../components/categories-card.component';

@Component({
  selector: 'app-categories-list-page',
  standalone: true,
  imports: [CommonModule, CategoriesCardComponent],
  templateUrl: './categories-list.page.html',
  styleUrls: ['./categories-list.page.scss'],
  providers: [CategoriesStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListPageComponent {
  store = inject(CategoriesStore);
}
