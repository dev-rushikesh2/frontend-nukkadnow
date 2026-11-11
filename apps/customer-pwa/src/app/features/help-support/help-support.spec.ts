import { HelpSupportMapper } from './data-access/help-support.mapper';

describe('HelpSupportFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new HelpSupportMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
