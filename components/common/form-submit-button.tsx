import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import LoadingSpinner from "../ui/loading-spinner";

const FormSubmitButton = ({
  onSubmit,
  label
}: {
  onSubmit: (formData: FormData) => void | Promise<void>;
  label?: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" formAction={onSubmit} disabled={pending}>
      {pending && <LoadingSpinner />}
      <span>{label}</span>
    </Button>
  );
};

export default FormSubmitButton;
