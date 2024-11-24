"use server";

import { createClient } from "@/utils/supabase/server";
import { Invoice } from "@/schema/types";

export const createInvoice = async (
  invoice: Omit<Invoice, "id" | "owner_id" | "created_at">
) => {
  const supabase = createClient();
  const res = await supabase.from("invoices").insert(invoice);
  if (res.error) {
    throw res.error;
  }
  return res;
};
