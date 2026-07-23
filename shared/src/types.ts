export interface Customer {
  id: number;
  name: string;
  email: string;
  paymentStatus: "pending" | "paid" | "failed";
}

export interface Payment {
  id: number;
  customerId: number;
  amountCents: number;
  status: "pending" | "paid" | "failed";
}
