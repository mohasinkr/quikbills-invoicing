import { db } from "@/drizzle";
import { customers } from "@/drizzle/schemas";

export const fetchCustomers = async () => {
  const response = await db.select().from(customers);
  console.log(response, "customers response");
  return response;
};
