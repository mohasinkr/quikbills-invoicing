import { FormControl, FormField, FormItem, FormLabel } from "./form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import { UseFormReturn } from "react-hook-form";

const FormSelect = ({
  form,
  name,
  placeholder,
  children,
}: {
  form: UseFormReturn<any>;
  name: string;
  placeholder?: string;
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{children}</SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
