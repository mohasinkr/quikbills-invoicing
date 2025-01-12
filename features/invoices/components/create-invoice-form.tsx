"use client";

import { AutoComplete } from "@/components/ui/autocomplete";
import { Label } from "@/components/ui/label";
import MoneyInput from "@/components/ui/money-input";
import { SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DatePicker from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { createInvoice } from "../actions/create-invoice";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import FormSelect from "@/components/ui/form-select";
import { TCustomerNames } from "@/schema/types";

const schema = z.object({
  unit_price: z.coerce.number().min(0.0, "Amount is required"),
  description: z.string().min(1, "Item description is required"),
  quantity: z.coerce.number().min(1, "At least one item is required"),
  total: z.coerce.number().min(0.0, "Total amount is required"),
  due_date: z.string(),
  status: z.enum(["paid", "unpaid", "overdue"]),
  customer_id: z.string().min(1, "Required"),
});

type InvoiceFormProps = {
  customerNames: TCustomerNames;
  setOpen?: (open: boolean) => React.Dispatch<React.SetStateAction<boolean>>;
};

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
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    console.table(values);
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
                <Textarea placeholder="Enter item description" {...field} />
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
                    form.setValue(
                      "total",
                      Number(e.target.value) * form.getValues("unit_price")
                    );
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
