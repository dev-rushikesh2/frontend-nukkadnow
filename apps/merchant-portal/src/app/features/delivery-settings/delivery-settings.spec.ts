import { DeliverySettingsMapper } from './data-access/delivery-settings.mapper';

describe('Merchant DeliverySettingsFeature', () => {
  it('should map merchant DTO to ViewModel correctly', () => {
    const mapper = new DeliverySettingsMapper();
    const result = mapper.toViewModel({ id: 'm-100', title: 'Batch A', subtitle: 'In Prep' });
    expect(result.id).toBe('m-100');
    expect(result.title).toBe('Batch A');
  });
});
