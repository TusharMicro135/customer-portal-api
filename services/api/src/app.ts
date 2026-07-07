import cors from 'cors';
import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import type { HealthStatus } from '@portal/shared-types';
import { customerIdSchema, paginationSchema, validate } from '@portal/shared-utils';
import { MemoryCustomerRepository, type CustomerRepository } from './repository.js';

export function createApp(repository: CustomerRepository = new MemoryCustomerRepository()): Express {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors());
  app.use(express.json({ limit: '100kb' }));

  app.get('/health', (_req, res) => {
    const body: HealthStatus = { status: 'ok', service: 'customer-portal-api', timestamp: new Date().toISOString() };
    res.json(body);
  });

  app.get('/customers', async (req, res, next) => {
    try {
      const { limit = 25, offset = 0 } = validate(paginationSchema, req.query);
      const customers = await repository.list(limit, offset);
      res.json({ items: customers, total: customers.length });
    } catch (error) {
      next(error);
    }
  });

  app.get('/customers/:id', async (req, res, next) => {
    try {
      const id = validate(customerIdSchema, req.params.id);
      const customer = await repository.findById(id);
      if (!customer) return res.status(404).json({ error: 'customer_not_found' });
      res.json(customer);
    } catch (error) {
      next(error);
    }
  });

  app.use((error: Error, _req: Request, res: Response, _next: NextFunction) =>
    res.status(400).json({ error: 'invalid_request', message: error.message })
  );

  return app;
}
