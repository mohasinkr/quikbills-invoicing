"use server";

import { db } from "@/drizzle";
import { customers } from "@/drizzle/schemas";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteCustomer = async (id: string) => {
  await db.delete(customers).where(eq(customers.customerId, id));
  revalidatePath("/customers");
};
