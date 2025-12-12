import { invoices } from "@/drizzle/schemas";
import { Customer } from "./customer";

export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;

export type InvoiceWithCustomer = Invoice & { customer: Customer };
