import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchCustomers, fetchPayments } from '../src/api/client';

describe('portal API client', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('returns customer and payment payloads', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => [{ id: 1, name: 'Ada' }] })
      .mockResolvedValueOnce({ ok: true, json: async () => [{ id: 4, status: 'paid' }] });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchCustomers()).resolves.toEqual([{ id: 1, name: 'Ada' }]);
    await expect(fetchPayments()).resolves.toEqual([{ id: 4, status: 'paid' }]);
    expect(fetchMock).toHaveBeenNthCalledWith(1, 'http://localhost:3000/api/customers');
    expect(fetchMock).toHaveBeenNthCalledWith(2, 'http://localhost:3000/api/payments');
  });

  it('reports an unsuccessful response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    await expect(fetchCustomers()).rejects.toThrow('Request failed with status 503');
  });
});

