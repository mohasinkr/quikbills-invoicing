import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

const LoadingSpinner = ({
  label,
  spinnerClassName,
  parentClassName,
}: {
  label?: string;
  spinnerClassName?: string;
  parentClassName?: string;
}) => {
  return (
    <div className={cn("inline-flex items-center gap-x-2", parentClassName)}>
      <span>{label || ""}</span>
      <LoaderCircle
        className={cn("h-8 w-8 animate-spin text-white", spinnerClassName)}
      />
    </div>
  );
};

export default LoadingSpinner;
