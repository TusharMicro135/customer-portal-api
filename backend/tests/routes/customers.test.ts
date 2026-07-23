import type { Request, Response } from "express";
import { createCustomer, listCustomers } from "../../src/routes/customers";
import { pool } from "../../src/db/pool";

jest.mock("../../src/db/pool", () => ({
  pool: { query: jest.fn() }
}));

const query = pool.query as jest.Mock;

describe("customers route handlers", () => {
  beforeEach(() => query.mockReset());

  it("returns customer records from the mocked pool", async () => {
    query.mockResolvedValue({ rows: [{ id: 1, name: "Dummy Customer", email: "dummy@example.invalid", paymentStatus: "paid" }] });
    const json = jest.fn();
    await listCustomers({} as Request, { json } as unknown as Response);
    expect(json).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ name: "Dummy Customer" })]));
  });

  it("creates a customer through the mocked pool", async () => {
    query.mockResolvedValue({ rows: [{ id: 2, name: "New Dummy", email: "new@example.invalid", paymentStatus: "pending" }] });
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    await createCustomer({ body: { name: "New Dummy", email: "new@example.invalid" } } as Request, { status } as unknown as Response);
    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalled();
  });
});
