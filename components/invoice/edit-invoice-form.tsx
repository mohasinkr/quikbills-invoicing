"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InvoiceWithCustomer, TCustomerNames } from "@/schema/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { AutoComplete } from "@/components/ui/autocomplete";
import { Label } from "@/components/ui/label";
import MoneyInput from "@/components/ui/money-input";
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
import { Textarea } from "@/components/ui/textarea";
import FormSelect from "@/components/ui/form-select";
import { SelectItem } from "@/components/ui/select";
import { getDirtyFields } from "@/utils/get-dirty-fields";
import { updateInvoice } from "@/actions/invoice/update-invoice";

const schema = z.object({
  id: z.number(),
  unit_price: z.coerce.number().min(0.0, "Amount is required"),
  description: z.string().min(1, "Item description is required"),
  quantity: z.coerce.number().min(1, "At least one item is required"),
  total: z.coerce.number().min(0.0, "Total amount is required"),
  due_date: z.string(),
  status: z.enum(["paid", "unpaid", "overdue"]),
  customer_id: z.string().min(1, "Required"),
});

type EditInvoiceFormProps = {
  invoice: InvoiceWithCustomer;
  customerNames: TCustomerNames;
  setOpen?: (open: boolean) => void;
};

const EditInvoiceForm = ({
  invoice,
  customerNames,
  setOpen,
}: EditInvoiceFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: invoice.id,
      unit_price: invoice.unit_price,
      description: invoice.description || "",
      quantity: invoice.quantity,
      total: invoice.total,
      due_date: invoice.due_date || "",
      status: invoice.status,
      customer_id: invoice.customer_id,
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsSubmitting(true);
    try {
      const editedValues = getDirtyFields(form.formState.dirtyFields, values);
      const response = await updateInvoice(editedValues);
      if (response.status === 200) {
        toast.success("Invoice updated successfully");
        setOpen?.(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update invoice");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="customer_id">Customer Name</Label>
          <AutoComplete
            name="customer_id"
            form={form}
            hideIcon
            options={customerNames}
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

        <DatePicker form={form} name="due_date" label="Due Date" />
        <MoneyInput form={form} label="Unit Price" name="unit_price" />

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

        <FormSelect name="status" form={form}>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="unpaid">Unpaid</SelectItem>
          <SelectItem value="overdue">Overdue</SelectItem>
        </FormSelect>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoadingSpinner label="Updating Invoice" />
          ) : (
            "Update Invoice"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditInvoiceForm;
