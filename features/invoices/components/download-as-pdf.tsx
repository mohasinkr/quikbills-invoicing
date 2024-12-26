"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DownloadInvoice = () => {
  const downloadPDF = () => {
    const element = document.getElementById("invoice-table");

    if (!element) {
      console.error("Element not found");
      return;
    }

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    });
  };

  return (
    <Button onClick={downloadPDF}>
      <DownloadIcon />
      <span>Download Invoice</span>
    </Button>
  );
};

export default DownloadInvoice;
