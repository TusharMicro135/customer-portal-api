import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "../src/App";

vi.mock("../src/api/client", () => ({
  getCustomers: vi.fn().mockResolvedValue([]),
  getPayments: vi.fn().mockResolvedValue([])
}));

describe("App", () => {
  it("renders the portal title", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Customer Account & Billing Portal" })).toBeInTheDocument();
  });

  it("renders the payment status section", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Customer payment status" })).toBeInTheDocument();
  });
});
