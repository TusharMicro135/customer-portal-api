import { Request, Response, Router } from "express";
import { pool } from "../db/pool";

export async function createRefund(req: Request, res: Response) {
  const { paymentId, reason } = req.body as { paymentId: number; reason: string };
  const result = await pool.query(
    "UPDATE payment_retries SET status = 'failed' WHERE id = $1 RETURNING id, customer_id, status",
    [paymentId]
  );
  if (!result.rows[0]) return res.status(404).json({ error: "Payment not found" });
  return res.status(202).json({ refund: result.rows[0], reason });
}

const router = Router();
router.post("/", createRefund);
export default router;
