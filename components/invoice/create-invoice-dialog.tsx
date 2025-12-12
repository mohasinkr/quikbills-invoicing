import ButtonWithIcon from "@/components/ui/button-with-icon";
import DialogForm from "@/components/ui/dialog-form";
import { TCustomerNames } from "@/types/customer";
import { PlusIcon } from "lucide-react";
import CreateInvoiceForm from "./create-invoice/create-invoice-form";

const CreateInvoiceDialog = ({
  customerNames,
}: {
  customerNames: TCustomerNames;
}) => {
  return (
    <DialogForm
      title="Create Invoice"
      trigger={<ButtonWithIcon icon={PlusIcon}>Create Invoice</ButtonWithIcon>}
      form={<CreateInvoiceForm customerNames={customerNames} />}
    />
  );
};

export default CreateInvoiceDialog;
