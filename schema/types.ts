import { Database } from "./schema";

export type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type Payments = Database["public"]["Tables"]["payments"]["Row"];


export interface InvoiceWithCustomer extends Invoice {
  customers: Customer;
}