import { FavouritesMapper } from './data-access/favourites.mapper';

describe('FavouritesFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new FavouritesMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
