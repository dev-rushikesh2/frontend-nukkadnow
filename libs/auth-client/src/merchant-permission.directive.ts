import { Directive, Input, TemplateRef, ViewContainerRef, inject, effect } from '@angular/core';
import { MerchantPermission, ROLE_PERMISSIONS, MerchantStaffRole } from './permissions.model';
import { AuthStateService } from './auth-state.service';

@Directive({
  selector: '[merchantHasPermission]',
  standalone: true
})
export class MerchantPermissionDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private authState = inject(AuthStateService);

  private requiredPermission: MerchantPermission | null = null;
  private isViewCreated = false;

  @Input()
  set merchantHasPermission(permission: MerchantPermission) {
    this.requiredPermission = permission;
    this.updateView();
  }

  constructor() {
    effect(() => {
      // Re-evaluate whenever user changes in authState
      this.authState.user();
      this.updateView();
    });
  }

  private updateView(): void {
    if (!this.requiredPermission) {
      this.show();
      return;
    }

    const user = this.authState.user();
    // Default to OWNER if no role set in demo/dev mode
    let activeRole: MerchantStaffRole = 'OWNER';
    if (user?.roles?.includes('merchant_owner')) {
      activeRole = 'OWNER';
    } else if (user?.roles?.includes('outlet_manager')) {
      activeRole = 'OUTLET_MANAGER';
    } else if (user?.roles?.includes('cashier')) {
      activeRole = 'CASHIER';
    }

    const allowedPermissions = ROLE_PERMISSIONS[activeRole] || [];
    const hasPermission = allowedPermissions.includes(this.requiredPermission);

    if (hasPermission && !this.isViewCreated) {
      this.show();
    } else if (!hasPermission && this.isViewCreated) {
      this.hide();
    }
  }

  private show(): void {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.isViewCreated = true;
  }

  private hide(): void {
    this.viewContainer.clear();
    this.isViewCreated = false;
  }
}
