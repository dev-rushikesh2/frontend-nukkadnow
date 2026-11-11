import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'discovery',
    loadChildren: () => import('./features/discovery/discovery.routes').then(m => m.DISCOVERY_ROUTES)
  },
  {
    path: 'categories',
    loadChildren: () => import('./features/categories/categories.routes').then(m => m.CATEGORIES_ROUTES)
  },
  {
    path: 'merchant/:id',
    loadChildren: () => import('./features/merchant-profile/merchant-profile.routes').then(m => m.MERCHANT_PROFILE_ROUTES)
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/cart/cart.routes').then(m => m.CART_ROUTES)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./features/checkout/checkout.routes').then(m => m.CHECKOUT_ROUTES)
  },
  {
    path: 'payment-result',
    loadChildren: () => import('./features/payment-result/payment-result.routes').then(m => m.PAYMENT_RESULT_ROUTES)
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/orders/orders.routes').then(m => m.ORDERS_ROUTES)
  },
  {
    path: 'order-tracking/:id',
    loadChildren: () => import('./features/order-tracking/order-tracking.routes').then(m => m.ORDER_TRACKING_ROUTES)
  },
  {
    path: 'pickup-token/:id',
    loadChildren: () => import('./features/pickup-token/pickup-token.routes').then(m => m.PICKUP_TOKEN_ROUTES)
  },
  {
    path: 'merchant-delivery/:id',
    loadChildren: () => import('./features/merchant-delivery/merchant-delivery.routes').then(m => m.MERCHANT_DELIVERY_ROUTES)
  },
  {
    path: 'favourites',
    loadChildren: () => import('./features/favourites/favourites.routes').then(m => m.FAVOURITES_ROUTES)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./features/notifications/notifications.routes').then(m => m.NOTIFICATIONS_ROUTES)
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.routes').then(m => m.ACCOUNT_ROUTES)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./features/onboarding/onboarding.routes').then(m => m.ONBOARDING_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/authentication/authentication.routes').then(m => m.AUTHENTICATION_ROUTES)
  },
  {
    path: 'help-support',
    loadChildren: () => import('./features/help-support/help-support.routes').then(m => m.HELP_SUPPORT_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
