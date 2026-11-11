import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[merchantHasPermission]',
  standalone: true
})
export class PermissionDirective {
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);

  @Input() set merchantHasPermission(permission: string) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}
