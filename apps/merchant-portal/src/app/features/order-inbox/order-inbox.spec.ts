import { OrderInboxMapper } from './data-access/order-inbox.mapper';

describe('Merchant OrderInboxFeature', () => {
  it('should map merchant DTO to ViewModel correctly', () => {
    const mapper = new OrderInboxMapper();
    const result = mapper.toViewModel({ id: 'm-100', title: 'Batch A', subtitle: 'In Prep' });
    expect(result.id).toBe('m-100');
    expect(result.title).toBe('Batch A');
  });
});
