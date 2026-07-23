import { Request, Response, Router } from "express";
import type { Customer } from "@customer-portal/shared";
import { pool } from "../db/pool";

export async function listCustomers(req: Request, res: Response) {
  const sessionToken = req.header("x-session-token")?.trim();
  if (sessionToken) {
    await pool.query(
      "UPDATE sessions SET expires_at = NOW() + INTERVAL '30 minutes' WHERE token = $1 AND expires_at > NOW()",
      [sessionToken]
    );
    res.setHeader("Cache-Control", "no-store");
  }
  const result = await pool.query<Customer>(
    "SELECT id, name, email, payment_status AS \"paymentStatus\" FROM customers ORDER BY id"
  );
  res.json(result.rows);
}

export async function createCustomer(req: Request, res: Response) {
  const { name, email } = req.body as Pick<Customer, "name" | "email">;
  const result = await pool.query<Customer>(
    "INSERT INTO customers (name, email, payment_status) VALUES ($1, $2, 'pending') RETURNING id, name, email, payment_status AS \"paymentStatus\"",
    [name, email]
  );
  res.status(201).json(result.rows[0]);
}

const router = Router();
router.get("/", listCustomers);
router.post("/", createCustomer);
export default router;
