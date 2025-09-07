"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import FormSelect from "@/components/ui/form-select";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { SUCCESS_MESSAGES } from "@/utils/constants";
import createCustomer from "@/actions/customer/create-customer";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string(),
  phone: z.string().min(10, "Required"),
  sex: z.enum(["male", "female", "other"]),
  address: z.string(),
  status: z.enum(["active", "inactive"]),
});

type CustomerFormProps = {
  setOpen?: (open: boolean) => React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCustomerForm = ({ setOpen }: CustomerFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      sex: "male",
      address: "",
      status: "active",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    console.table(values);
    setIsSubmitting(true);
    try {
      console.table(values);
      const response = await createCustomer(values);
      if (response.status === 201) {
        toast.success(SUCCESS_MESSAGES.CUSTOMER_CREATED);
        form.reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSelect name="sex" form={form} placeholder="Sex">
          <SelectItem value={"male"}>Male</SelectItem>
          <SelectItem value={"female"}>Female</SelectItem>
          <SelectItem value={"other"}>Other</SelectItem>
        </FormSelect>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="eg: abc@gmail.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="+91-1234567890" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="ABC Lane, 123, New York" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormSelect name="status" form={form} placeholder="Status">
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </FormSelect>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoadingSpinner label={"Creating Customer"} />
          ) : (
            "Create Customer"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateCustomerForm;
