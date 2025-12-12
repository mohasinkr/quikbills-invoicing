"use server";

import { createClient } from "@/utils/supabase/server";
import type { NewInvoice } from "@/types/invoice";
import { revalidatePath } from "next/cache";

export const createInvoice = async (invoice: NewInvoice) => {
  const supabase = await createClient();
  const res = await supabase.from("invoices").insert(invoice);
  if (res.error) {
    console.log(res.error);
    throw res.error;
  }
  revalidatePath("/invoice");
  return res;
};
