"use client";

import { Command as CommandPrimitive } from "cmdk";
import { useRef, useCallback, type KeyboardEvent, useState } from "react";
import { Skeleton } from "./skeleton";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

type AutoCompleteProps = {
  form: UseFormReturn<any>;
  name: string;
  hideIcon?: boolean;
  options: string[];
  emptyMessage?: string;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

export const AutoComplete = ({
  form,
  name,
  hideIcon,
  options,
  placeholder,
  disabled,
  isLoading = false,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);

  // const handleKeyDown = useCallback(
  //   (event: KeyboardEvent<HTMLDivElement>, field: any) => {
  //     const input = inputRef.current;
  //     if (!input) return;

  //     if (event.key === "Enter" && input.value !== "") {
  //       const optionToSelect = options.find((option) => option === input.value);
  //       if (optionToSelect) {
  //         field.onChange(optionToSelect);
  //       }
  //     }

  //     if (event.key === "Escape") {
  //       input.blur();
  //     }
  //   },
  //   [options]
  // );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, field: any) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find((option) => option === input.value);
        if (optionToSelect) {
          field.onChange(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSelectOption = useCallback(
    (selectedOption: string, field: any) => {
      field.onChange(selectedOption);
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    []
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormControl>
            <CommandPrimitive
              onKeyDown={(event) => handleKeyDown(event, field)}
              shouldFilter={false}
            >
              <div>
                <CommandInput
                  hideIcon={hideIcon}
                  ref={inputRef}
                  value={field.value || ""}
                  onValueChange={isLoading ? undefined : field.onChange}
                  onBlur={handleBlur}
                  onFocus={() => setOpen(true)}
                  placeholder={placeholder}
                  disabled={disabled}
                  className="text-base"
                />
              </div>
              <div className="relative mt-1">
                <div
                  className={cn(
                    "absolute top-0 z-10 w-full rounded-xl bg-white outline-none animate-in fade-in-0 zoom-in-95",
                    isOpen ? "block" : "hidden"
                  )}
                >
                  <CommandList className="rounded-lg ring-1 ring-slate-200">
                    {isLoading ? (
                      <CommandPrimitive.Loading>
                        <div className="p-1">
                          <Skeleton className="h-8 w-full" />
                        </div>
                      </CommandPrimitive.Loading>
                    ) : null}
                    {options.length > 0 && !isLoading ? (
                      <CommandGroup>
                        {options.map((option) => {
                          const isSelected = field.value === option;
                          return (
                            <CommandItem
                              key={option}
                              value={option}
                              onMouseDown={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                              }}
                              onSelect={() => handleSelectOption(option, field)}
                              className={cn(
                                "flex w-full items-center gap-2",
                                !isSelected ? "pl-8" : null
                              )}
                            >
                              {isSelected ? <Check className="w-4" /> : null}
                              {option}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    ) : null}
                    {!isLoading ? (
                      <CommandPrimitive.Empty className="cursor-pointer rounded-sm px-2 py-3 text-center text-sm text-gray-600">
                        Add {field.value}?
                      </CommandPrimitive.Empty>
                    ) : null}
                  </CommandList>
                </div>
              </div>
            </CommandPrimitive>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
