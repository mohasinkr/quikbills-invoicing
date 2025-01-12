import ButtonWithIcon from "@/components/ui/button-with-icon";
import DialogForm from "@/components/ui/dialog-form";
import { UserPlus } from "lucide-react";
import CreateCustomerForm from "./create-customer-form";

const CreateCustomerDialog = () => {
  return (
    <DialogForm
      title="Create Customer"
      trigger={<ButtonWithIcon icon={UserPlus}>Create Customer</ButtonWithIcon>}
      form={<CreateCustomerForm />}
    />
  );
};

export default CreateCustomerDialog;
