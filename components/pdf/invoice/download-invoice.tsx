"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { pdf } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import InvoicePDF from "./invoice-pdf";
import { InvoiceWithCustomer } from "@/schema/types";

export default function InvoiceDownload({
  invoices,
}: {
  invoices: InvoiceWithCustomer[] | null;
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      const sampleItems = Array.from({ length: 30 }).map((_, i) => ({
        description: `Service ${i + 1}`,
        quantity: 2,
        price: 100,
      }));

      const blob = await pdf(
        <InvoicePDF
          invoiceNo=""
          date="03/07/2023"
          dueDate="31/07/2023"
          issuedTo={{
            name: "Laravel LLC",
            address: "102, San-Fransico, CA, USA",
            email: "info@laravel.com",
          }}
          items={sampleItems}
          subtotal={10500}
          tax={1050}
          discount={10}
          total={11550}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      a.click();

      // 3. Cleanup
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={loading}>
      {loading ? (
        "Generating..."
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download Invoice PDF
        </>
      )}
    </Button>
  );
}
