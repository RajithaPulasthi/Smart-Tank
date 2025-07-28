export interface Payment {
  id: number;
  billingName: string;
  billingAddress: string;
  billingEmail: string;
  billingPhone: string;
  service: string;
  paymentMethod: string;
  amount: number;
  paymentDate: string;
  status: string;
}
