"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const deleteCustomer = async (id: number) => {
  const supabase = await createClient();
  const res = await supabase.from("customers").delete().eq("id", id);
  if (res.error) {
    throw res.error;
  }
  revalidatePath("/invoice");
  return res;
};
