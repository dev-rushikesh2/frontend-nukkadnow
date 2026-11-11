import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const merchantPermissionGuard: CanActivateFn = () => {
  return true;
};
