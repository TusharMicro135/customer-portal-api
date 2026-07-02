import { customerIdSchema, paginationSchema, validate } from './validation';

describe('validation', () => {
  it('accepts a UUID customer id', () => expect(validate(customerIdSchema, 'd9428888-122b-11e1-b85c-61cd3cbb3210')).toBeTruthy());
  it('coerces pagination inputs', () => expect(paginationSchema.parse({ limit: '10' })).toEqual({ limit: 10, offset: 0 }));
  it('rejects oversized pages', () => expect(() => paginationSchema.parse({ limit: 101 })).toThrow());
});
