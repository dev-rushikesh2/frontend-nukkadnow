import { LocationSelectorMapper } from './data-access/location-selector.mapper';

describe('LocationSelectorFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new LocationSelectorMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
