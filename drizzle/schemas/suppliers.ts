import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const suppliers = pgTable('suppliers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  address: text('address'),
  email: text('email'),
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
