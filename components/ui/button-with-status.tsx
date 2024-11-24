import React from "react";
import { Button } from "./button";
import { useFormStatus } from "react-dom";

const ButtonWithStatus = ({
  loadingMsg,
  label,
}: {
  loadingMsg?: string;
  label: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full">
      {pending ? loadingMsg || "Loading..." : label}
    </Button>
  );
};

export default ButtonWithStatus;
