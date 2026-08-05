import { Router, type Request, type Response } from 'express';
import type { Payment } from '@customer-portal/shared';
import { pool } from '../db/pool';

const router = Router();

router.get('/', async (_request: Request, response: Response) => {
  const result = await pool.query<Payment>(
    'SELECT id, customer_id AS "customerId", amount_cents AS "amountCents", status FROM payment_retries ORDER BY id DESC',
  );
  response.json(result.rows);
});

router.get('/:customerId', async (request: Request, response: Response) => {
  const result = await pool.query<Payment>(
    'SELECT id, customer_id AS "customerId", amount_cents AS "amountCents", status FROM payment_retries WHERE customer_id = $1',
    [request.params.customerId],
  );
  response.json(result.rows);
});

export default router;
