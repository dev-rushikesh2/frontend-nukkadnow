import { MerchantDeliveryMapper } from './data-access/merchant-delivery.mapper';

describe('MerchantDeliveryFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new MerchantDeliveryMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
