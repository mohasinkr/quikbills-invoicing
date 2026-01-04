"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import FormSelect from "@/components/ui/form-select";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { SUCCESS_MESSAGES } from "@/utils/constants";
import { updateCustomer } from "@/actions/customer/update-customer";
import { Customer } from "@/types/customer";

const schema = z.object({
  customerId: z.string(),
  name: z.string().min(1, "Required"),
  email: z.string().optional(),
  phone: z.string().min(10, "Required"),
  sex: z.enum(["male", "female", "other"]),
  address: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

interface EditCustomerModalProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditCustomerModal = ({ customer, open, onOpenChange }: EditCustomerModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      customerId: "",
      name: "",
      email: "",
      phone: "",
      sex: "male",
      address: "",
      status: "active",
    },
    mode: "onSubmit",
  });

  // Update form when customer changes
  useEffect(() => {
    if (customer) {
      form.reset({
        customerId: customer.customerId,
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        sex: customer.sex || "male",
        address: customer.address || "",
        status: customer.status,
      });
    }
  }, [customer, form]);

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsSubmitting(true);
    try {
      await updateCustomer(values);
      toast.success(SUCCESS_MESSAGES.CUSTOMER_UPDATED || "Customer updated successfully");
      onOpenChange(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogDescription>
            Make changes to the customer information below.
          </DialogDescription>
        </DialogHeader>

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

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <LoadingSpinner label={"Updating Customer"} />
                ) : (
                  "Update Customer"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCustomerModal;
