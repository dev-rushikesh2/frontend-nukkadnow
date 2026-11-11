import { BillingMapper } from './data-access/billing.mapper';

describe('Merchant BillingFeature', () => {
  it('should map merchant DTO to ViewModel correctly', () => {
    const mapper = new BillingMapper();
    const result = mapper.toViewModel({ id: 'm-100', title: 'Batch A', subtitle: 'In Prep' });
    expect(result.id).toBe('m-100');
    expect(result.title).toBe('Batch A');
  });
});
