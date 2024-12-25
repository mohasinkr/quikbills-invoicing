import React from "react";
import { Button } from "./button";
import { PlusIcon } from "lucide-react";

const AddButton = ({ title }: { title: string }) => {
  return (
    <Button>
      <PlusIcon className="mr-2 h-4 w-4" /> {title || "Add"}
    </Button>
  );
};

export default AddButton;
