import { Router, type Request, type Response } from 'express';
import type { Customer } from '@customer-portal/shared';
import { pool } from '../db/pool';

export const router = Router();

export async function getCustomers(_request: Request, response: Response): Promise<void> {
  const result = await pool.query<Customer>(
    'SELECT id, name, email, payment_status AS "paymentStatus" FROM customers ORDER BY id',
  );
  response.json(result.rows);
}

export async function createCustomer(request: Request, response: Response): Promise<void> {
  const { name, email } = request.body as Pick<Customer, 'name' | 'email'>;
  const result = await pool.query<Customer>(
    'INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING id, name, email, payment_status AS "paymentStatus"',
    [name, email],
  );
  response.status(201).json(result.rows[0]);
}

router.get('/', getCustomers);
router.post('/', createCustomer);

export default router;
