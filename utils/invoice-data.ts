import { InvoiceWithCustomer } from "@/schema/types";

export function createPdfInvoiceData(invoice: InvoiceWithCustomer) {
  const subtotal = invoice.quantity * invoice.unit_price;
  const tax = 0; // or dynamic if backend provides
  const discount = 0;
  const total = invoice.total ?? subtotal + tax - discount;

  return {
    invoiceNo: `INV-${invoice.id}`,
    date: invoice.created_at.split("T")[0],
    dueDate: invoice.due_date,
    issuedTo: {
      name: invoice.customers.name,
    },
    items: [
      {
        description: invoice.description,
        quantity: invoice.quantity,
        price: invoice.unit_price,
      }
    ],
    subtotal,
    tax,
    discount,
    total
  };
}
