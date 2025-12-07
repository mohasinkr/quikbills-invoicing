import { pgTable, uuid, timestamp, index, integer } from "drizzle-orm/pg-core";
import { customers } from "./customers";
import { invoices } from "./invoices";

export const payments = pgTable(
  "payments",
  {
    id: uuid().primaryKey().defaultRandom(),
    customerId: uuid("customer_id")
      .notNull()
      .references(() => customers.customerId, { onDelete: "cascade" }),
    invoiceId: integer("invoice_id")
      .notNull()
      .references(() => invoices.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("payments_customer_id_idx").on(table.customerId),
    index("payments_invoice_id_idx").on(table.invoiceId),
  ]
);
