import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PortalDashboard } from '../src/components/PortalDashboard';
import { fetchCustomers, fetchPayments } from '../src/api/client';

vi.mock('../src/api/client', () => ({
  fetchCustomers: vi.fn(),
  fetchPayments: vi.fn(),
}));

describe('PortalDashboard', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders payment statuses returned by the API', async () => {
    vi.mocked(fetchCustomers).mockResolvedValue([
      { id: 1, name: 'Ada', email: 'ada@example.invalid', paymentStatus: 'pending' },
    ]);
    vi.mocked(fetchPayments).mockResolvedValue([
      { id: 7, customerId: 1, amountCents: 500, status: 'reconciled' },
    ]);

    render(<PortalDashboard />);
    expect(screen.getByText('Loading payment statuses...')).toBeTruthy();
    expect(await screen.findByText('Ada: reconciled')).toBeTruthy();
  });

  it('shows an error when a request fails', async () => {
    vi.mocked(fetchCustomers).mockRejectedValue(new Error('offline'));
    vi.mocked(fetchPayments).mockResolvedValue([]);
    render(<PortalDashboard />);
    expect(await screen.findByText('Unable to load payment statuses.')).toBeTruthy();
  });
});

