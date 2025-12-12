import { InvoiceWithCustomer } from "@/types/invoice";

export function createPdfInvoiceData(invoice: InvoiceWithCustomer) {
  const subtotal = invoice.quantity * invoice.unitPrice;
  const tax = 0; // or dynamic if backend provides
  const discount = 0;
  const total = invoice.total ?? subtotal + tax - discount;

  return {
    invoiceNo: `INV-${invoice.id}`,
    date: invoice.createdAt.toISOString().split("T")[0],
    dueDate: invoice.dueDate,
    issuedTo: {
      name: invoice.customer.name,
    },
    items: [
      {
        description: invoice.description,
        quantity: invoice.quantity,
        price: invoice.unitPrice,
      }
    ],
    subtotal,
    tax,
    discount,
    total
  };
}
