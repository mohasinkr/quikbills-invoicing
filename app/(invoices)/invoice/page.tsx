import InvoiceListing from "@/features/invoices/components/invoice-listing";
import InvoiceTable from "@/features/invoices/components/invoice-listing";
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

  return <InvoiceListing invoices={invoices} />;
};

export default InvoicePage;
