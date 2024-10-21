import InvoiceTable from "@/features/invoice-listing/components/invoice-table";
import { createClient } from "@/utils/supabase/server";

const InvoicePage = async () => {
  const supabase = createClient();
  
  const { data: invoices } = await supabase
    .from("invoices")
    .select(`*, customers(name)`);

  return <InvoiceTable invoices={invoices} />;
};

export default InvoicePage;
