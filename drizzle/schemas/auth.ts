import { pgSchema, serial, uuid, varchar } from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
    id: uuid("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
});
