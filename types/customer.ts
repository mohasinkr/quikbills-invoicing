import { customers } from "@/drizzle/schemas";

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;

export type TCustomerNames = Array<{
  name: Customer["name"];
  value: Customer["customerId"];
}>;
