import { Request, Response, Router } from "express";
import type { Payment } from "@customer-portal/shared";
import { pool } from "../db/pool";

export async function listPayments(_req: Request, res: Response) {
  const result = await pool.query<Payment>(
    "SELECT id, customer_id AS \"customerId\", amount_cents AS \"amountCents\", status FROM payment_retries ORDER BY id"
  );
  res.json(result.rows);
}

export async function getPaymentStatus(req: Request, res: Response) {
  const result = await pool.query<Payment>(
    "SELECT id, customer_id AS \"customerId\", amount_cents AS \"amountCents\", status FROM payment_retries WHERE id = $1",
    [req.params.id]
  );
  if (!result.rows[0]) return res.status(404).json({ error: "Payment not found" });
  return res.json(result.rows[0]);
}

const router = Router();
router.get("/", listPayments);
router.get("/:id", getPaymentStatus);
export default router;
