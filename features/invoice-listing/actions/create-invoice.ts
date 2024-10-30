"use server";

import { createClient } from "@/utils/supabase/server";
import { Invoice } from "@/schema/types";

export const createInvoice = async (invoice: Omit<Invoice, "id">) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("invoices").insert(invoice);
  if (error) {
    throw error;
  }
  return data;
}; 