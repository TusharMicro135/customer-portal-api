import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.PGHOST ?? 'localhost',
  port: Number(process.env.PGPORT ?? 5432),
  database: process.env.PGDATABASE ?? 'customer_portal',
  user: process.env.PGUSER ?? 'portal',
  password: process.env.PGPASSWORD ?? 'dummy-local-password',
});
