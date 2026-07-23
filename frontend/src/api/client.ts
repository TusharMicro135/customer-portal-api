import type { Customer, Payment } from "@customer-portal/shared";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(baseUrl + path);
  if (!response.ok) {
    throw new Error("API request failed with status " + response.status);
  }
  return response.json() as Promise<T>;
}

export function getCustomers(): Promise<Customer[]> {
  return getJson<Customer[]>("/api/customers");
}

export function getPayments(): Promise<Payment[]> {
  return getJson<Payment[]>("/api/payments");
}
