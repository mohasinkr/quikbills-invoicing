import CreateInvoiceForm from "./create-invoice-form";
import { getCustomers } from "@/lib/db/customers/get-customers";
import DialogForm from "@/components/ui/dialog-form";
import AddButton from "@/components/ui/add-button";
import { TCustomerNames } from "@/schema/types";

const CreateInvoiceDialog = async ({
  customerNames,
}: {
  customerNames: TCustomerNames;
}) => {
  return (
    <DialogForm
      title="Create Invoice"
      trigger={<AddButton title="Create New Invoice" />}
      form={<CreateInvoiceForm customerNames={customerNames} />}
    />
  );
};

export default CreateInvoiceDialog;
