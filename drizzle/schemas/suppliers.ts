import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const suppliers = pgTable('suppliers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
