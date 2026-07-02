import type { Customer } from '@portal/shared-types';
const customer: Customer = { id: 'd9428888-122b-11e1-b85c-61cd3cbb3210', email: 'ada@example.com', displayName: 'Ada Lovelace', status: 'active', createdAt: '2026-06-01T10:00:00Z' };
export default function Dashboard() {
  return <main><p className="eyebrow">Dashboard</p><h1>Welcome back, {customer.displayName}</h1><section className="grid"><article><span>Account status</span><strong>{customer.status}</strong></article><article><span>Open invoices</span><strong>2</strong></article><article><span>Support tickets</span><strong>1</strong></article></section><section className="panel"><h2>Recent activity</h2><p>Your contact email is {customer.email}. No action is required today.</p></section></main>;
}
