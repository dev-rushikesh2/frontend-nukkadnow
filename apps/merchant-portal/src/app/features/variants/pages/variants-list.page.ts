import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariantsStore } from '../state/variants.store';
import { VariantsCardComponent } from '../components/variants-card.component';

@Component({
  selector: 'merchant-variants-list-page',
  standalone: true,
  imports: [CommonModule, VariantsCardComponent],
  templateUrl: './variants-list.page.html',
  styleUrls: ['./variants-list.page.scss'],
  providers: [VariantsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariantsListPageComponent {
  store = inject(VariantsStore);
}
