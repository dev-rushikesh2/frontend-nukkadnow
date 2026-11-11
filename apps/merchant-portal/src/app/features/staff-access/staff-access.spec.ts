import { StaffAccessMapper } from './data-access/staff-access.mapper';

describe('Merchant StaffAccessFeature', () => {
  it('should map merchant DTO to ViewModel correctly', () => {
    const mapper = new StaffAccessMapper();
    const result = mapper.toViewModel({ id: 'm-100', title: 'Batch A', subtitle: 'In Prep' });
    expect(result.id).toBe('m-100');
    expect(result.title).toBe('Batch A');
  });
});
