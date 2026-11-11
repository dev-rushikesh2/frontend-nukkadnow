import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-skeleton',
  standalone: true,
  template: `<div class="ui-skeleton" [style.width]="width()" [style.height]="height()" [style.border-radius]="radius()"></div>`,
  styles: [`
    .ui-skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
    }
    @keyframes skeleton-loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent {
  width = input<string>('100%');
  height = input<string>('20px');
  radius = input<string>('4px');
}
