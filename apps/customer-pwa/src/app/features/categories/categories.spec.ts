import { CategoriesMapper } from './data-access/categories.mapper';

describe('CategoriesFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new CategoriesMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
