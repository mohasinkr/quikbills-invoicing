import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const customerStatus = pgEnum("customerStatus", ["active", "inactive"]);
export const sexEnum = pgEnum("sex", ["male", "female", "other"]);

export const customers = pgTable(
  "customers",
  {
    customerId: uuid("customer_id").primaryKey().defaultRandom(),
    name: text("name"),
    phone: text("phone").notNull(),
    email: text("email"),
    address: text("address"),
    sex: sexEnum("sex"),
    status: customerStatus("status").notNull().default("active"),
    userId: uuid("user_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lastPurchase: timestamp("last_purchase"),
  },
  (table) => [
    index("customers_user_id_idx").on(table.userId),
    index("customers_phone_idx").on(table.phone),
    index("customers_email_idx").on(table.email),
  ]
);
