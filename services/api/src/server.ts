import { logger } from '@portal/shared-utils';
import { createApp } from './app.js';
const port = Number(process.env.PORT ?? 4000);
createApp().listen(port, () => logger.info('API listening', { port }));
