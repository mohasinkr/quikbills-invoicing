"use server";
import { Customer } from "@/schema/types";
import { createClient } from "@/utils/supabase/server";

const createCustomer = async (customer: Customer) => {
  const supabase = createClient();
  const { error } = await supabase.from("customers").insert(customer);
  if (error) {
    throw new Error(error.message);
  }
};

export default createCustomer;
