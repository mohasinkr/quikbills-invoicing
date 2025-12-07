import { db } from "@/drizzle";
import { customers, invoices } from "@/drizzle/schemas";
import { InvoiceWithCustomer } from "@/schema/types";
import { eq, desc } from "drizzle-orm";

export const fetchInvoices = async () => {
  const result = await db
    .select({
      // Invoice fields
      id: invoices.id,
      created_at: invoices.createdAt,
      description: invoices.description,
      due_date: invoices.dueDate,
      owner_id: invoices.ownerId,
      quantity: invoices.quantity,
      status: invoices.status,
      total: invoices.total,
      unit_price: invoices.unitPrice,
      customer_id: invoices.customerId,
      // Joined customer data
      customers: {
        name: customers.name,
        email: customers.email,
        phone: customers.phone,
        address: customers.address,
        sex: customers.sex,
        status: customers.status,
        user_id: customers.userId,
        created_at: customers.createdAt,
        last_purchase: customers.lastPurchase,
      },
    })
    .from(invoices)
    .leftJoin(customers, eq(invoices.customerId, customers.customerId))
    .orderBy(desc(invoices.id));

  // Convert Date objects to ISO strings and restructure to match InvoiceWithCustomer type
  return result.map(row => ({
    id: row.id,
    created_at: row.created_at.toISOString(),
    description: row.description,
    due_date: row.due_date, // Already a string from database
    owner_id: row.owner_id,
    quantity: row.quantity,
    status: row.status,
    total: Number(row.total),
    unit_price: Number(row.unit_price),
    customer_id: row.customer_id,
    customers: {
      customer_id: row.customer_id,
      name: row.customers?.name || null,
      phone: row.customers?.phone || '',
      email: row.customers?.email || null,
      address: row.customers?.address || null,
      sex: row.customers?.sex || null,
      status: row.customers?.status || 'active',
      user_id: row.customers?.user_id || '',
      created_at: row.customers?.created_at.toISOString() || '',
      last_purchase: row.customers?.last_purchase?.toISOString() || null,
    },
  })) as InvoiceWithCustomer[];
};
