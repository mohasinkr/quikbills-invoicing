import InvoiceTable from "@/features/invoices/components/invoice-table";
import { InvoiceWithCustomer } from "@/schema/types";
import { createClient } from "@/utils/supabase/server";

const InvoicePage = async () => {
  const supabase = createClient();

  const { data: invoices } = await supabase
    .from("invoices")
    .select(`*, customers(name)`).returns<InvoiceWithCustomer[]>();

  if (!invoices) {
    return <div>No invoices found</div>;
  }

  return <InvoiceTable invoices={invoices} />;
};

export default InvoicePage;
