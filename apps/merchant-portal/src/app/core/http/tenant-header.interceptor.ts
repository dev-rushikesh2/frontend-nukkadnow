import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TenantStore } from '../tenant-context/tenant.store';
import { OutletSwitcherStore } from '../outlet-context/outlet-switcher.store';

export const tenantHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const tenantStore = inject(TenantStore);
  const outletStore = inject(OutletSwitcherStore);

  const tenantId = tenantStore.activeTenantId();
  const outletId = outletStore.activeOutletId();

  let headers = req.headers;
  if (tenantId) headers = headers.set('x-tenant-id', tenantId);
  if (outletId) headers = headers.set('x-outlet-id', outletId);

  return next(req.clone({ headers }));
};
