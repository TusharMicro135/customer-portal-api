import express from 'express';
import customersRouter from './routes/customers';
import paymentsRouter from './routes/payments';

export const app = express();

app.use(express.json());
app.use('/api/customers', customersRouter);
app.use('/api/payments', paymentsRouter);

if (require.main === module) {
  const port = Number(process.env.PORT ?? 3000);
  app.listen(port, () => {
    console.log(`Customer portal API listening on port ${port}`);
  });
}
