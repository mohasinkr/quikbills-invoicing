import { Button } from "@/components/ui/button";
import { CheckIcon, EditIcon, XIcon } from "lucide-react";

const InvoiceActions = ({ invoiceId }: { invoiceId: number }) => (
  <div className="flex space-x-2">
    <Button
      variant="outline"
      size="sm"
      //   onClick={() => onEditInvoice(invoiceId)}
    >
      <EditIcon className="h-4 w-4" />
    </Button>
    <Button
      variant="outline"
      size="sm"
      //  onClick={() => onMarkPaid(invoiceId)}
    >
      <CheckIcon className="h-4 w-4" />
    </Button>
    <Button
      variant="outline"
      size="sm"
      //   onClick={() => onDeleteInvoice(invoiceId)}
    >
      <XIcon className="h-4 w-4" />
    </Button>
  </div>
);

export default InvoiceActions;
