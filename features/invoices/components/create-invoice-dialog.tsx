import CreateInvoiceForm from "./create-invoice-form";
import { getCustomers } from "@/features/customers/actions/get-customers";
import DialogForm from "@/components/ui/dialog-form";
import AddButton from "@/components/ui/add-button";

const CreateInvoiceDialog = async () => {
  // mapping the customer names to an array
  const customerNames = (await getCustomers(["name", "customer_id"])).map(
    (customer) => ({ name: customer.name, value: customer.customer_id })
  );

  return (
    <DialogForm
      title="Create Invoice"
      trigger={<AddButton title="Create New Invoice" />}
      form={<CreateInvoiceForm customerNames={customerNames} />}
    />
  );
};

export default CreateInvoiceDialog;
