export const ApiEndpoints = {
  auth: {
    sendOtp: '/auth/otp/send',
    verifyOtp: '/auth/otp/verify',
    refreshToken: '/auth/token/refresh',
    logout: '/auth/logout'
  },
  discovery: {
    outlets: '/discovery/outlets',
    categories: '/discovery/categories',
    search: '/discovery/search'
  },
  catalog: {
    products: (outletId: string) => `/catalog/outlets/${outletId}/products`,
    productDetails: (id: string) => `/catalog/products/${id}`
  },
  orders: {
    create: '/orders',
    details: (orderId: string) => `/orders/${orderId}`,
    customerOrders: '/orders/my',
    merchantInbox: '/merchant/orders/inbox',
    accept: (orderId: string) => `/merchant/orders/${orderId}/accept`,
    reject: (orderId: string) => `/merchant/orders/${orderId}/reject`,
    ready: (orderId: string) => `/merchant/orders/${orderId}/ready`
  },
  fulfillment: {
    capacity: (outletId: string) => `/fulfillment/outlets/${outletId}/capacity`,
    slots: (outletId: string) => `/fulfillment/outlets/${outletId}/slots`
  }
} as const;
