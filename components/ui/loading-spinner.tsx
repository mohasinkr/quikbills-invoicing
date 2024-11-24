import { LoaderCircle } from "lucide-react";

const LoadingSpinner = ({ label }: { label?: string }) => {
  return (
    <div>
      <LoaderCircle className="h-8 w-8 animate-spin text-white" />
      <span>{label}</span>
    </div>
  );
};

export default LoadingSpinner;
