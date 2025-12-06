"use client";

import { createInvoice } from "@/actions/invoice/create-invoice";
import { AutoComplete } from "@/components/ui/autocomplete";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormSelect from "@/components/ui/form-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/ui/loading-spinner";
import MoneyInput from "@/components/ui/money-input";
import { SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TCustomerNames } from "@/schema/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  unit_price: z.coerce.number().min(0.0, "Required"),
  description: z.string().min(1, "Required"),
  quantity: z.coerce.number().min(1, "Required"),
  total: z.coerce.number().min(0.0, "Required"),
  due_date: z.string(),
  status: z.enum(["paid", "unpaid", "overdue"]),
  customer_id: z.string().min(1, "Required"),
  phone_number: z.string().min(10, "Required"),
});

type InvoiceFormProps = {
  customerNames: TCustomerNames;
  setOpen?: (open: boolean) => React.Dispatch<React.SetStateAction<boolean>>;
};

const samplePhone = [
  {
    name: "1234567890",
    value: "1234567890",
  },
  {
    name: "0987654321",
    value: "0987654321",
  },
];

const CreateInvoiceForm = ({ customerNames, setOpen }: InvoiceFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      unit_price: 0,
      description: "",
      quantity: 1,
      total: 0,
      due_date: new Date().toISOString(),
      status: "unpaid",
      customer_id: "",
      phone_number: "",
    },
    mode: "onSubmit",
  });

  const phone = form.watch("phone_number");

  async function onSubmit(values: z.infer<typeof schema>) {
    console.table(values);
    const { phone_number, ...rest } = values;
    setIsSubmitting(true);
    try {
      console.table(values);
      const response = await createInvoice(values);
      if (response.status === 201) {
        toast.success("Invoice created successfully");
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
        <div>
          {/* <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    className="resize-none"
                    placeholder="Enter phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Label htmlFor="customer_name">Phone Number</Label>
          <AutoComplete
            name="phone_number"
            form={form}
            hideIcon
            options={samplePhone}
            // emptyMessage="Add kevin?"
          />
        </div>
        <div>
          <Label htmlFor="customer_name">Customer Name</Label>
          <AutoComplete
            name="customer_id"
            form={form}
            hideIcon
            options={customerNames}
            // emptyMessage="Add kevin?"
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Description</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Enter item description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DatePicker form={form} name="due_date" label="Due Date" />

        <MoneyInput form={form} label="Unit Price" name="unit_price" />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  {...field}
                  onChange={(e) => {
                    const quantity = Number(e.target.value);
                    const unitPrice = form.getValues("unit_price");
                    const total = parseFloat((quantity * unitPrice).toFixed(2));
                    form.setValue("total", total);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Amount</FormLabel>
              <FormControl>
                <Input type="number" readOnly {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormSelect name="status" form={form} placeholder="Status">
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="unpaid">Unpaid</SelectItem>
          <SelectItem value="overdue">Overdue</SelectItem>
        </FormSelect>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoadingSpinner label={"Creating Invoice"} />
          ) : (
            "Create Invoice"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateInvoiceForm;
