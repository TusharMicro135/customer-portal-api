import type { Request, Response } from 'express';
import { createCustomer, getCustomers } from '../../src/routes/customers';
import { pool } from '../../src/db/pool';

jest.mock('../../src/db/pool', () => ({
  pool: { query: jest.fn() },
}));

describe('customer route handlers', () => {
  const query = pool.query as jest.Mock;

  beforeEach(() => query.mockReset());

  it('returns customer rows from the mocked database', async () => {
    const rows = [{ id: 1, name: 'Example Customer', email: 'customer@example.invalid' }];
    query.mockResolvedValue({ rows });
    const response = { json: jest.fn() } as unknown as Response;

    await getCustomers({} as Request, response);

    expect(response.json).toHaveBeenCalledWith(rows);
  });

  it('creates a customer using the mocked database', async () => {
    const customer = { id: 2, name: 'Fixture Customer', email: 'fixture@example.invalid' };
    query.mockResolvedValue({ rows: [customer] });
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    await createCustomer({ body: customer } as Request, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(customer);
  });
});
