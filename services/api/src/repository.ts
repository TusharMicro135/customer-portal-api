import type { Customer } from '@portal/shared-types';
export interface CustomerRepository { findById(id: string): Promise<Customer | null>; list(limit: number, offset: number): Promise<Customer[]>; }
const seed: Customer[] = [{ id: 'd9428888-122b-11e1-b85c-61cd3cbb3210', email: 'ada@example.com', displayName: 'Ada Lovelace', status: 'active', createdAt: '2026-06-01T10:00:00Z' }];
export class MemoryCustomerRepository implements CustomerRepository {
  async findById(id: string) { return seed.find(customer => customer.id === id) ?? null; }
  async list(limit: number, offset: number) { return seed.slice(offset, offset + limit); }
}
