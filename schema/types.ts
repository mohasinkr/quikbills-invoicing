import { Database, Tables } from "./schema";

export type Invoice = Tables<"invoices">;
export type Customer = Tables<"customers">;
export type Payments = Tables<"payments">;


export interface InvoiceWithCustomer extends Invoice {
  customers: Tables<"customers">;
}