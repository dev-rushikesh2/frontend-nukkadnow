import { PickupTokenMapper } from './data-access/pickup-token.mapper';

describe('PickupTokenFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new PickupTokenMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
