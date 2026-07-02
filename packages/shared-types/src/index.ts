export type CustomerStatus = 'active' | 'suspended' | 'pending';

export interface Customer {
  id: string;
  email: string;
  displayName: string;
  status: CustomerStatus;
  createdAt: string;
}

export interface HealthStatus {
  status: 'ok' | 'degraded';
  service: string;
  timestamp: string;
}

export interface CustomerSearchResult {
  items: Customer[];
  total: number;
}

export interface CustomerWelcomeJob { customerId: string; email: string; }
