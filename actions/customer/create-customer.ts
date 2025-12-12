"use server";

import { NewCustomer } from "@/types/customer";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const createCustomer = async (
  customer: NewCustomer
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
