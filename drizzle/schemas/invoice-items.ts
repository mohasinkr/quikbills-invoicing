import { decimal, integer, pgTable, text } from "drizzle-orm/pg-core";
import { invoices } from "./invoices";

export const invoiceItems = pgTable("invoice_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  invoiceId: integer("invoice_id")
    .notNull()
    .references(() => invoices.id, { onDelete: "cascade" }),
  itemName: text("item_name").default(""),
  quantity: decimal({ scale: 2 }).notNull(),
  unitPrice: decimal({ precision: 10, scale: 2 }),
});