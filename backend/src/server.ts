import express from "express";
import customersRouter from "./routes/customers";
import paymentsRouter from "./routes/payments";

const app = express();
app.use(express.json());
app.use("/api/customers", customersRouter);
app.use("/api/payments", paymentsRouter);

const port = Number(process.env.PORT || 4000);
if (require.main === module) {
  app.listen(port, () => console.log("Customer portal API listening on " + port));
}

export default app;
