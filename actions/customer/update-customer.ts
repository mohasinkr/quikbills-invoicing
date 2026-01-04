"use server";

import { db } from "@/drizzle";
import { customers } from "@/drizzle/schemas";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const UpdateCustomerSchema = z
  .object({
    customerId: z.string(),
    name: z.string().min(1, "Name is required"),
    email: z.string().optional(),
    phone: z.string().min(1, "Phone is required"),
    sex: z.enum(["male", "female", "other"]).optional(),
    address: z.string().optional(),
    status: z.enum(["active", "inactive"]).optional(),
  })
  .partial({
    name: true,
    email: true,
    phone: true,
    sex: true,
    address: true,
    status: true,
  });

export async function updateCustomer(
  values: z.infer<typeof UpdateCustomerSchema>
) {
  try {
    const { customerId, ...updateData } = values;

    await db
      .update(customers)
      .set(updateData)
      .where(eq(customers.customerId, customerId));

    revalidatePath("/customers");
    return { status: 200 };
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
}
