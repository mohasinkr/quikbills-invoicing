import {
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";
import { customers } from "./customers";

export const invoiceStatus = pgEnum("Status", ["paid", "unpaid", "overdue"]);

export const invoices = pgTable(
  "invoices",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    customerId: uuid("customer_id")
      .notNull()
      .references(() => customers.customerId, { onDelete: "cascade" }),
    description: text("description"),
    dueDate: date("due_date"),
    ownerId: uuid("owner_id"),
    quantity: integer("quantity").notNull().default(1),
    status: invoiceStatus("status").notNull().default("unpaid"),
    total: real("total").notNull().default(0.0),
    unitPrice: real("unit_price").notNull().default(0.0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_invoices_customer_createdat").on(
      table.customerId,
      table.createdAt
    ),
  ]
);
