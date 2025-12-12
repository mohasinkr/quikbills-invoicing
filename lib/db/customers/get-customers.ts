import { db } from "@/drizzle";
import { customers } from "@/drizzle/schemas";

export const fetchCustomers = async () => {
  const response = await db.select().from(customers);
  return response;
};

export const fetchCustomerNames = async () => {
  const response = await db
    .select({ name: customers.name, value: customers.customerId })
    .from(customers);
  return response;
};
