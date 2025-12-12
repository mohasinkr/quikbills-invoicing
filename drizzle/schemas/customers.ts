import { relations } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { invoices } from "./invoices";

export const customerStatus = pgEnum("customerStatus", ["active", "inactive"]);
export const sexEnum = pgEnum("sex", ["male", "female", "other"]);

export const customers = pgTable(
  "customers",
  {
    customerId: uuid("customer_id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    address: text("address"),
    sex: sexEnum("sex"),
    status: customerStatus("status").notNull().default("active"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lastPurchase: timestamp("last_purchase"),
  },
  (table) => [
    index("customers_phone_idx").on(table.phone),
    index("customers_email_idx").on(table.email),
  ]
);

export const customerRelations = relations(customers, ({ many }) => ({
  invoices: many(invoices),
}));
