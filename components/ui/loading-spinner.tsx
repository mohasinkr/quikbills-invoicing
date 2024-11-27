import { LoaderCircle } from "lucide-react";

const LoadingSpinner = ({ label }: { label?: string }) => {
  return (
    <div className="inline-flex items-center gap-x-2">
      <span>{label || ""}</span>
      <LoaderCircle className="h-8 w-8 animate-spin text-white" />
    </div>
  );
};

export default LoadingSpinner;
