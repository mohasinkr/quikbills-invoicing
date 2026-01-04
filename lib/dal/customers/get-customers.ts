import { checkUser } from "@/lib/dal/check-user";
import { db } from "@/drizzle";
import { customers } from "@/drizzle/schemas";
import { eq } from "drizzle-orm";

export const fetchCustomers = async () => {
  const user = await checkUser();

  if (!user) return [];

  const response = await db
    .select()
    .from(customers)
    .where(eq(customers.ownerId, user.userId));

  return response;
};

export const fetchCustomerNames = async () => {
  const response = await db
    .select({ name: customers.name, value: customers.customerId })
    .from(customers);
  return response;
};
