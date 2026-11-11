export function createMockOrder(id = 'order-1') {
  return {
    id,
    outletId: 'outlet-1',
    customerId: 'cust-1',
    status: 'PLACED' as const,
    items: [],
    subtotalPaise: 15000,
    taxPaise: 750,
    totalPaise: 15750,
    fulfillmentType: 'PICKUP' as const,
    createdAt: new Date().toISOString()
  };
}
