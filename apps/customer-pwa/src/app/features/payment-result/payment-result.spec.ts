import { PaymentResultMapper } from './data-access/payment-result.mapper';

describe('PaymentResultFeature', () => {
  it('should map DTO to ViewModel correctly', () => {
    const mapper = new PaymentResultMapper();
    const result = mapper.toViewModel({ id: '123', title: 'Test', subtitle: 'Desc' });
    expect(result.id).toBe('123');
    expect(result.title).toBe('Test');
  });
});
