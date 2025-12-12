"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InvoiceWithCustomer } from "@/types/invoice";
import { TCustomerNames } from "@/types/customer";
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
import { updateInvoice, UpdateInvoiceSchema } from "@/actions/invoice/update-invoice";

const schema = z.object({
  id: z.number(),
  unit_price: z.string().min(1, "Amount is required"),
  description: z.string().min(1, "Item description is required"),
  quantity: z.string().min(1, "At least one item is required"),
  total: z.string().min(1, "Total amount is required"),
  dueDate: z.string(),
  status: z.enum(["paid", "unpaid", "overdue"]),
  customerId: z.string().min(1, "Required"),
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

  console.log(invoice, "invoices");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: invoice.id,
      unit_price: invoice.unitPrice.toString(),
      description: invoice.description || "",
      quantity: invoice.quantity.toString(),
      total: invoice.total.toString(),
      dueDate: invoice.dueDate || "",
      status: invoice.status,
      customerId: invoice.customerId,
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsSubmitting(true);
    try {
      const dirtyValues = getDirtyFields(form.formState.dirtyFields, values);
      const transformed: z.infer<typeof UpdateInvoiceSchema> = {
        id: values.id,
        unit_price: dirtyValues.unit_price ? Number(dirtyValues.unit_price) : undefined,
        description: dirtyValues.description,
        quantity: dirtyValues.quantity ? Number(dirtyValues.quantity) : undefined,
        total: dirtyValues.total ? Number(dirtyValues.total) : undefined,
        dueDate: dirtyValues.dueDate,
        status: dirtyValues.status,
        customerId: dirtyValues.customerId,
      };
      const response = await updateInvoice(transformed);
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
                      (Number(e.target.value) * Number(form.getValues("unit_price"))).toString()
                    );
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DatePicker form={form} name="dueDate" label="Due Date" />
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
