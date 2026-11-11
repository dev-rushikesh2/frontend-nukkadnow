import { CheckoutMapper } from './data-access/checkout.mapper';

describe('CheckoutFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new CheckoutMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
