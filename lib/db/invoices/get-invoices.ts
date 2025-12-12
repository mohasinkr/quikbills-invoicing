import { db } from "@/drizzle";

export const fetchInvoices = async () => {
  const result = await db.query.invoices.findMany({
    with: {
      customer: true,
    },
    orderBy: (fields, operators) => operators.desc(fields.id),
  });

  return result;
};
