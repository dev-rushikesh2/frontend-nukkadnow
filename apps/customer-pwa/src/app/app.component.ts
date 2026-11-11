import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerShellComponent } from './layout/customer-shell/customer-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomerShellComponent],
  template: `
    <app-customer-shell>
      <router-outlet></router-outlet>
    </app-customer-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
