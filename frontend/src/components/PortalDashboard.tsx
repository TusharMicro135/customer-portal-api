import { useEffect, useState } from "react";
import type { Customer, Payment } from "@customer-portal/shared";
import { getCustomers, getPayments } from "../api/client";

export function PortalDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getCustomers(), getPayments()])
      .then(([nextCustomers, nextPayments]) => {
        setCustomers(nextCustomers);
        setPayments(nextPayments);
      })
      .catch(() => setError("Payment status is temporarily unavailable."));
  }, []);

  if (error) return <p role="alert">{error}</p>;

  return (
    <section aria-label="Customer payment status">
      <h2>Customer payment status</h2>
      <ul>
        {customers.map((customer) => {
          const payment = payments.find((item) => item.customerId === customer.id);
          return (
            <li key={customer.id}>
              {customer.name}: {payment?.status || customer.paymentStatus}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
