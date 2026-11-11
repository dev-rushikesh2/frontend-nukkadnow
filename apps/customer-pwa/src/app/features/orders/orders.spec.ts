import { OrdersMapper } from './data-access/orders.mapper';

describe('OrdersFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new OrdersMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
