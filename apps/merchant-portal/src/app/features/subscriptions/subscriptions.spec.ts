import { SubscriptionsMapper } from './data-access/subscriptions.mapper';

describe('Merchant SubscriptionsFeature', () => {
  it('should map merchant DTO to ViewModel correctly', () => {
    const mapper = new SubscriptionsMapper();
    const result = mapper.toViewModel({ id: 'm-100', title: 'Batch A', subtitle: 'In Prep' });
    expect(result.id).toBe('m-100');
    expect(result.title).toBe('Batch A');
  });
});
