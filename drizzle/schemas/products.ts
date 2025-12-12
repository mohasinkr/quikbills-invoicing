import { decimal, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});
