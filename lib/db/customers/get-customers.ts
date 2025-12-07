import { db } from "@/drizzle";
import { customers } from "@/drizzle/schemas/customers";
import { Customer } from "@/schema/types";
import { desc } from "drizzle-orm";

type CustomerColumns = keyof Customer;
type SelectColumns = CustomerColumns | "*" | CustomerColumns[];

export const fetchCustomers = async (columns: SelectColumns = "*") => {
  // For now, always return all columns since the column selection is complex
  // with the type mismatches between Drizzle camelCase and Supabase snake_case
  const result = await db
    .select()
    .from(customers)
    .orderBy(desc(customers.createdAt));

  // Convert Date objects to ISO strings to match Customer type
  return result.map((customer) => ({
    customer_id: customer.customerId,
    name: customer.name,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    sex: customer.sex,
    status: customer.status,
    user_id: customer.userId,
    created_at: customer.createdAt.toISOString(),
    last_purchase: customer.lastPurchase?.toISOString() || null,
  })) as Customer[];
};
