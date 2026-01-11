import IndividualInvoiceForm from "@/components/invoice/individual-invoice-form";
import { Button } from "@/components/ui/button";
import { fetchCustomerNames } from "@/lib/dal/customers/get-customers";
import { fetchInvoices } from "@/lib/dal/invoices/get-invoices";
import { Printer } from "lucide-react";
import { notFound } from "next/navigation";

const IndividualInvoicePage = async ({ params }: { params: { id: string } }) => {
  const customerNames = await fetchCustomerNames();
  const invoices = await fetchInvoices();
  
  // Find the invoice with the matching ID
  const invoice = invoices.find(inv => inv.id.toString() === params.id);
  
  if (!invoice) {
    return notFound();
  }

  const invoiceItems = [{
    item_name: invoice.description || "",
    quantity: invoice.quantity,
    unit_price: invoice.unitPrice,
    total: invoice.total,
  }];

  const invoiceData = {
    ...invoice,
    items: invoiceItems,
    grand_total: invoice.total,
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-primary text-3xl font-bold">View Invoice</h1>
        <Button onClick={handlePrint} variant="outline" size="sm">
          <Printer className="mr-2 h-4 w-4" />
          Print Invoice
        </Button>
      </div>

      <IndividualInvoiceForm 
        invoice={invoiceData} 
        customerNames={customerNames} 
      />
    </div>
  );
};

export default IndividualInvoicePage;
