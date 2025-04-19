import InvoiceHeader from "@/components/invoice/invoice-header";
import InvoiceListing from "@/components/invoice/invoice-listing";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "quikBills Invoice Listing",
  description: "List all invoices",
};

const InvoicePage = async () => {
  // return <InvoiceListing invoices={invoices} />;
  return (
    <div className="container mx-auto">
      <InvoiceHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <InvoiceListing />
      </Suspense>
    </div>
  );
};

export default InvoicePage;
