import { InvoiceWithCustomer } from "@/schema/types";
import { createClient } from "@/utils/supabase/server";

export const fetchInvoices = async () => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("invoices")
    .select(`*, customers(name)`)
    .order("id")
    .returns<InvoiceWithCustomer[]>();

  return data;
};
