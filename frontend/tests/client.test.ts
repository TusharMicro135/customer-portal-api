import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchCustomers, fetchPayments } from '../src/api/client';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('API client', () => {
  it('loads customer rows', async () => {
    const customers = [{ id: 1, name: 'Ada', email: 'ada@example.com', paymentStatus: 'paid' }];
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue(customers) });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchCustomers()).resolves.toEqual(customers);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/customers');
  });

  it('loads payment rows', async () => {
    const payments = [{ id: 7, customerId: 1, amountCents: 1200, status: 'queued' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue(payments) }));

    await expect(fetchPayments()).resolves.toEqual(payments);
  });

  it('rejects unsuccessful responses', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));

    await expect(fetchCustomers()).rejects.toThrow('Request failed with status 503');
  });
});
