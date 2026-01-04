import { customers } from "@/drizzle/schemas/customers";
import { eq } from "drizzle-orm";
import { checkUser } from "../check-user";
import { db } from "@/drizzle";

export const fetchInvoices = async () => {
  const user = await checkUser();
  if (!user) return [];

  return db.query.invoices.findMany({
    where: (invoice, { inArray }) =>
      inArray(
        invoice.customerId,
        db
          .select({ id: customers.customerId })
          .from(customers)
          .where(eq(customers.ownerId, user.userId))
      ),
    with: {
      customer: true,
    },
    orderBy: (fields, operators) => operators.desc(fields.id),
  });
};
