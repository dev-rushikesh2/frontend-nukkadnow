import { AuthenticationMapper } from './data-access/authentication.mapper';

describe('AuthenticationFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new AuthenticationMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
