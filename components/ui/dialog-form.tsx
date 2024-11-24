"use client";

import React, { cloneElement, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

type DialogFormProps = {
  form: JSX.Element;
  trigger: React.ReactNode;
  title: string;
};

const DialogForm = ({ form, trigger, title }: DialogFormProps) => {
  const [open, setOpen] = useState(false);

  const FormWithState = () => {
    return cloneElement(form, { setOpen });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mb-4">
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <FormWithState />
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
