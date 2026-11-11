import { OrderTrackingMapper } from './data-access/order-tracking.mapper';

describe('OrderTrackingFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new OrderTrackingMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
