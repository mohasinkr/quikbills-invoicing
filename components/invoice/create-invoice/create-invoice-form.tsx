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
import CurrencyDisplay from "@/components/ui/currency-display";
import LoadingSpinner from "@/components/ui/loading-spinner";
import MoneyInput from "@/components/ui/money-input";
import { SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TCustomerNames } from "@/schema/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
  invoice_id: z.string(), // Auto-generated - adding this for display
});

type InvoiceFormData = z.infer<typeof schema>;

const CreateInvoicePageForm = ({
  customerNames,
}: {
  customerNames: TCustomerNames;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      unit_price: 0,
      description: "",
      quantity: 1,
      total: 0,
      due_date: new Date().toISOString(),
      status: "unpaid",
      customer_id: "",
      invoice_id: "Auto-generated",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: InvoiceFormData) {
    setIsSubmitting(true);
    try {
      const { invoice_id, ...invoiceData } = values; // Remove invoice_id before sending to API
      const response = await createInvoice(invoiceData);
      if (response.error) {
        toast.error("Something went wrong");
        return;
      }

      toast.success("Invoice created successfully");
      router.push("/invoice");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

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
                // emptyMessage="Add kevin?"
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
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 w-full">
                      <Input
                        placeholder="Item name"
                        value="Sample Item"
                        className="border-none bg-transparent shadow-none focus:ring-0 w-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => {
                              const quantity = Number(e.target.value);
                              const unitPrice = form.getValues("unit_price");
                              const total = parseFloat(
                                (quantity * unitPrice).toFixed(2)
                              );
                              form.setValue("total", total);
                              field.onChange(e);
                            }}
                            className="border-none bg-transparent text-center shadow-none focus:ring-0 w-20"
                          />
                        )}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <MoneyInput form={form} label="" name="unit_price" className="w-32" />
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      <div className="w-auto max-w-[200px] h-10 border border-input px-3 py-2 text-sm ring-offset-background rounded-md overflow-x-auto whitespace-nowrap text-right">
                        <CurrencyDisplay value={form.watch("total")} />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-right">
              <div className="text-lg font-semibold">
                Total: <CurrencyDisplay value={form.watch("total")} />
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
                <LoadingSpinner label={"Creating Invoice"} />
              ) : (
                "Create Invoice"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateInvoicePageForm;
