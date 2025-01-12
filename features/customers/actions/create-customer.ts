"use server";

import { Customer } from "@/schema/types";
import { createClient } from "@/utils/supabase/server";

const createCustomer = async (
  customer: Omit<
    Customer,
    "customer_id" | "last_purchase" | "user_id" | "created_at"
  >
) => {
  const supabase = await createClient();
  const { error } = await supabase.from("customers").insert(customer);
  if (error) {
    throw new Error(error.message);
  }
};

export default createCustomer;
