"use server";

import { createClient } from "@/utils/supabase/server";
import { Invoice } from "@/schema/types";
import { revalidatePath } from "next/cache";

export const createInvoice = async (
  invoice: Omit<Invoice, "id" | "owner_id" | "created_at">
) => {
  const supabase = await createClient();
  const res = await supabase.from("invoices").insert(invoice);
  if (res.error) {
    console.log(res.error);
    throw res.error;
  }
  revalidatePath("/invoice");
  return res;
};
