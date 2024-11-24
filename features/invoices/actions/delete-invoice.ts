"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const deleteInvoice = async (id: number) => {
  const supabase = createClient();
  const res = await supabase.from("invoices").delete().eq("id", id);
  if (res.error) {
    throw res.error;
  }
  revalidatePath("/invoice");
  return res;
};
