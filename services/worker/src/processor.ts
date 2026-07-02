import type { CustomerWelcomeJob } from '@portal/shared-types';
import { logger } from '@portal/shared-utils';
export interface WelcomeResult { customerId: string; delivered: boolean; }
export async function processWelcome(data: CustomerWelcomeJob): Promise<WelcomeResult> { if (!data.email.includes('@')) throw new Error('Invalid welcome email'); logger.info('Processing welcome notification', { customerId: data.customerId }); return { customerId: data.customerId, delivered: true }; }
