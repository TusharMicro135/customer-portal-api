import type { Request, Response } from "express";
import { createRefund } from "../../src/routes/refunds";
import { pool } from "../../src/db/pool";

jest.mock("../../src/db/pool", () => ({ pool: { query: jest.fn() } }));

it("accepts a refund for a mocked payment retry", async () => {
  (pool.query as jest.Mock).mockResolvedValue({ rows: [{ id: 1, customer_id: 7, status: "failed" }] });
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  await createRefund({ body: { paymentId: 1, reason: "duplicate" } } as Request, { status } as unknown as Response);
  expect(status).toHaveBeenCalledWith(202);
});
