import { OnboardingMapper } from './data-access/onboarding.mapper';

describe('OnboardingFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new OnboardingMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
