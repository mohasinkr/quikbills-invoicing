import CreateInvoicePageForm from "@/components/invoice/create-invoice/create-invoice-form";
import {
  fetchCustomerNames,
  fetchCustomers,
} from "@/lib/dal/customers/get-customers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "quikBills Create Invoice",
  description: "Create a new invoice",
};

const CreateInvoicePage = async () => {
  // mapping the customer names to an array

  const customerNames = await fetchCustomerNames();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-primary text-3xl font-bold">Create Invoice</h1>
      </div>

      <CreateInvoicePageForm customerNames={customerNames} />
    </div>
  );
};

export default CreateInvoicePage;
