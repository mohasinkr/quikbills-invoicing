"use server";

import { db } from "@/drizzle";
import { customers } from "@/drizzle/schemas";
import { checkUser } from "@/lib/dal/check-user";
import { NewCustomer } from "@/types/customer";
import { revalidatePath } from "next/cache";

const createCustomer = async (customer: NewCustomer) => {
  const { userId } = await checkUser();
  const res = await db.insert(customers).values({
    ...customer,
    ownerId: userId,
  });
  revalidatePath("/customers");
  return res;
};

export default createCustomer;
