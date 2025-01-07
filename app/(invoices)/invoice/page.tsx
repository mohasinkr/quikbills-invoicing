import InvoiceListing from "@/features/invoices/components/invoice-listing";
import { InvoiceWithCustomer } from "@/schema/types";
import { createClient } from "@/utils/supabase/server";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "quikBills Invoice Listing",
  description: "List all invoices",
};

const InvoicePage = async () => {
  const supabase = await createClient();

  const { data: invoices } = await supabase
    .from("invoices")
    .select(`*, customers(name)`)
    .order("id")
    .returns<InvoiceWithCustomer[]>();

  if (!invoices) {
    return <div>No invoices found</div>;
  }

  return <InvoiceListing invoices={invoices} />;
};

export default InvoicePage;
