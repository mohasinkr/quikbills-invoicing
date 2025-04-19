const InvoiceStatusBadge = ({ status }: { status: string }) => {
  const statusClass = (() => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  })();

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold uppercase ${statusClass}`}
    >
      {status}
    </span>
  );
};

export default InvoiceStatusBadge;
