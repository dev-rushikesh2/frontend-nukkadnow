import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MerchantShellComponent } from './layout/merchant-shell/merchant-shell.component';

@Component({
  selector: 'merchant-root',
  standalone: true,
  imports: [RouterOutlet, MerchantShellComponent],
  template: `
    <merchant-shell>
      <router-outlet></router-outlet>
    </merchant-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
