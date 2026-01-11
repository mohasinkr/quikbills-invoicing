"use client";

import { updateInvoice } from "@/actions/invoice/update-invoice";
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
import CurrencyDisplay from "@/components/ui/currency-display";
import LoadingSpinner from "@/components/ui/loading-spinner";
import MoneyInput from "@/components/ui/money-input";
import { SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TCustomerNames } from "@/types/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { InvoiceWithCustomer } from "@/types/invoice";

const itemSchema = z.object({
  item_name: z.string().optional(),
  quantity: z.number().min(1, "Required"),
  unit_price: z.number().min(0.0, "Required"),
  total: z.number().min(0.0, "Required"),
});

const invoiceFormSchema = z.object({
  id: z.number(),
  items: z.array(itemSchema).min(1, "At least one item is required"),
  description: z.string().optional(),
  due_date: z.string().min(1, "Due date is required"),
  status: z.enum(["paid", "unpaid", "overdue"]),
  customer_id: z.string().min(1, "Customer is required"),
  invoice_id: z.string(),
  grand_total: z.number().min(0, "Grand total must be positive"),
});

type InvoiceData = InvoiceWithCustomer & {
  items: {
    item_name: string | undefined;
    quantity: number;
    unit_price: number;
    total: number;
  }[];
  grand_total: number;
};

const IndividualInvoiceForm = ({
  invoice,
  customerNames,
}: {
  invoice: InvoiceData;
  customerNames: TCustomerNames;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof invoiceFormSchema>>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      id: invoice.id,
      items: invoice.items || [{
        item_name: "",
        quantity: 1,
        unit_price: 0,
        total: 0,
      }],
      description: invoice.description || "",
      due_date: invoice.dueDate ? new Date(invoice.dueDate).toISOString() : new Date().toISOString(),
      status: invoice.status,
      customer_id: invoice.customerId,
      invoice_id: `INV-${invoice.id.toString().padStart(4, "0")}`,
      grand_total: invoice.grand_total || 0,
    },
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  // Calculate grand total whenever items change
  const watchedItems = form.watch("items");
  const grandTotal = watchedItems?.reduce((sum, item) => sum + (item.total || 0), 0) || 0;

  // Update grand total in form
  React.useEffect(() => {
    form.setValue("grand_total", grandTotal);
  }, [grandTotal, form]);

  async function onSubmit(values: z.infer<typeof invoiceFormSchema>) {
    setIsSubmitting(true);
    try {
      // Transform data for API
      const transformedData = {
        id: values.id,
        description: values.description || "",
        dueDate: values.due_date,
        status: values.status,
        customerId: values.customer_id,
        quantity: values.items[0]?.quantity || 1,
        unitPrice: values.items[0]?.unit_price || 0,
        total: values.grand_total,
      };

      const response = await updateInvoice(transformedData);
      if (response.status !== 200) {
        toast.error("Something went wrong");
        return;
      }

      toast.success("Invoice updated successfully");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  const addItem = () => {
    append({
      item_name: "",
      quantity: 1,
      unit_price: 0,
      total: 0,
    });
  };

  const removeItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const calculateItemTotal = (index: number) => {
    const quantity = form.getValues(`items.${index}.quantity`) || 1;
    const unitPrice = form.getValues(`items.${index}.unit_price`) || 0;
    const total = parseFloat((quantity * unitPrice).toFixed(2));
    form.setValue(`items.${index}.total`, total);
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Invoice Header */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
            <FormField
              control={form.control}
              name="invoice_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice ID</FormLabel>
                  <FormControl>
                    <Input readOnly {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Label htmlFor="customer_name">Customer Name</Label>
              <AutoComplete
                name="customer_id"
                form={form}
                hideIcon
                options={customerNames}
              />
            </div>
          </div>

          <section className="max-w-2xl">
            <div className="mb-5 grid grid-cols-2 items-center gap-5">
              <DatePicker form={form} name="due_date" label="Due Date" />
              <FormSelect name="status" form={form} placeholder="Status">
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </FormSelect>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="max-w-2xl">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Enter invoice description"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          {/* Invoice Items Table */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Invoice Items</h3>
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">
                      Item Name
                    </th>
                    <th className="px-4 py-2 text-center font-medium">Qty</th>
                    <th className="px-4 py-2 text-right font-medium">Price</th>
                    <th className="px-4 py-2 text-right font-medium">Total</th>
                    <th className="px-4 py-2 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {fields.map((field, index) => (
                    <tr key={field.id} className="hover:bg-muted/50">
                      <td className="px-4 py-3 w-full">
                        <FormField
                          control={form.control}
                          name={`items.${index}.item_name`}
                          render={({ field }) => (
                            <Input
                              placeholder="Item name"
                              {...field}
                              className="w-full"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addItem();
                                }
                              }}
                            />
                          )}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <FormField
                          control={form.control}
                          name={`items.${index}.quantity`}
                          render={({ field }) => (
                            <Input
                              type="number"
                              min="1"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                calculateItemTotal(index);
                              }}
                              className="text-center w-20"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addItem();
                                }
                              }}
                            />
                          )}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <MoneyInput
                          form={form}
                          label=""
                          name={`items.${index}.unit_price`}
                          className="w-32"
                          onChange={() => calculateItemTotal(index)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addItem();
                            }
                          }}
                        />
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        <div className="w-32 h-10 border border-input px-3 py-2 text-sm ring-offset-background rounded-md overflow-x-auto whitespace-nowrap text-right">
                          <CurrencyDisplay value={form.watch(`items.${index}.total`)} />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          type="button"
                          onClick={() => removeItem(index)}
                          variant="ghost"
                          size="sm"
                          disabled={fields.length <= 1}
                          className="text-red-500 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Button type="button" onClick={addItem} variant="outline" size="sm">
                Add Item
              </Button>
              <div className="text-lg font-semibold">
                Grand Total: <CurrencyDisplay value={grandTotal} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/invoice")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <LoadingSpinner label={"Updating Invoice"} />
              ) : (
                "Update Invoice"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default IndividualInvoiceForm;
