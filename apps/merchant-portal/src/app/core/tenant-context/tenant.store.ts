import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TenantStore {
  readonly activeTenantId = signal<string>('tenant-sample-nagpur-1');
  readonly tenantName = signal<string>('Haldiram Nukkad Outlet');

  setTenant(id: string, name: string) {
    this.activeTenantId.set(id);
    this.tenantName.set(name);
  }
}
