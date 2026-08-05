import request from 'supertest';
import { app } from '../../src/server';
import { pool } from '../../src/db/pool';

jest.mock('../../src/db/pool', () => ({ pool: { query: jest.fn() } }));

describe('payment routes', () => {
  const query = pool.query as jest.Mock;
  beforeEach(() => query.mockReset());

  it('returns recent payment rows', async () => {
    const rows = [{ id: 7, customerId: 1, amountCents: 500, status: 'queued' }];
    query.mockResolvedValue({ rows });
    const response = await request(app).get('/api/payments');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(rows);
    expect(query).toHaveBeenCalledWith(expect.stringContaining('ORDER BY id DESC'));
  });

  it('filters payments by customer', async () => {
    query.mockResolvedValue({ rows: [] });
    const response = await request(app).get('/api/payments/42');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
    expect(query).toHaveBeenCalledWith(expect.stringContaining('WHERE customer_id = $1'), ['42']);
  });
});

