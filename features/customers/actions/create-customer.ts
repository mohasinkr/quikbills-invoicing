"use server";

import { Customer } from "@/schema/types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const createCustomer = async (
  customer: Omit<
    Customer,
    "customer_id" | "last_purchase" | "user_id" | "created_at"
  >
) => {
  const supabase = await createClient();
  const res = await supabase.from("customers").insert(customer);
  if (res.error) {
    throw new Error(res.error.message);
  }
  revalidatePath("/customers");
  return res;
};

export default createCustomer;
