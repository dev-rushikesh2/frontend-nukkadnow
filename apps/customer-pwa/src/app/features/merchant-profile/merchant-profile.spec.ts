import { MerchantProfileMapper } from './data-access/merchant-profile.mapper';

describe('MerchantProfileFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new MerchantProfileMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
