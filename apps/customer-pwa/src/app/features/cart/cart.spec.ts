import { CartMapper } from './data-access/cart.mapper';

describe('CartFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new CartMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
