import { useEffect, useState } from 'react';
import type { Customer, Payment } from '@customer-portal/shared';
import { fetchCustomers, fetchPayments } from '../api/client';

export function PortalDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchCustomers(), fetchPayments()])
      .then(([customerRows, paymentRows]) => {
        setCustomers(customerRows);
        setPayments(paymentRows);
      })
      .catch(() => setError('Unable to load payment statuses.'));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <section aria-label="Customer payment status">
      <h2>Customer payment status</h2>
      {customers.length === 0 ? (
        <p>Loading payment statuses...</p>
      ) : (
        <ul>
          {customers.map((customer) => {
            const payment = payments.find((row) => row.customerId === customer.id);
            return (
              <li key={customer.id}>
                {customer.name}: {payment?.status ?? customer.paymentStatus}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
