import type { Customer, Payment } from '@customer-portal/shared';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function fetchCustomers(): Promise<Customer[]> {
  return getJson<Customer[]>('/api/customers');
}

export function fetchPayments(): Promise<Payment[]> {
  return getJson<Payment[]>('/api/payments');
}
