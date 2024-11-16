"use client";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

import { moneyFormatter } from "@/lib/format-money";

type TextInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
};

export default function MoneyInput(props: TextInputProps) {
  const initialValue = props.form.getValues()[props.name];
  const [displayValue, setDisplayValue] = useState(() =>
    initialValue ? moneyFormatter(initialValue) : ""
  );

  const handleChange = (
    formOnChange: (value: number) => void,
    inputValue: string
  ) => {
    const digits = inputValue.replace(/\D/g, "");

    const numericValue = Number(digits) / 100;

    const formatted = moneyFormatter(numericValue);
    props.form.setValue(
      "total",
      props.form.getValues("quantity") * numericValue
    );
    setDisplayValue(formatted);
    formOnChange(numericValue);
  };

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input
              placeholder={props.placeholder || "₹0.00"}
              type="text"
              {...field}
              onChange={(ev) => handleChange(field.onChange, ev.target.value)}
              value={displayValue}
              inputMode="numeric"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
