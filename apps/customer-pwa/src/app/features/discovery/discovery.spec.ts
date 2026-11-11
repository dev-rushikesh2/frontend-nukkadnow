import { DiscoveryMapper } from './data-access/discovery.mapper';

describe('DiscoveryFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new DiscoveryMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
