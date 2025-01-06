"use client";

import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { DownloadIcon, Loader2 } from "lucide-react";
import { useState } from "react";

const DownloadInvoice = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {
    const element = document.getElementById("invoice-table");

    if (!element) {
      console.error("Invoice element not found");
      return;
    }

    try {
      setIsGenerating(true);

      // Calculate scale factor for better quality
      const scale = window.devicePixelRatio || 1;

      const canvas = await html2canvas(element, {
        scale: scale * 2, // Increase quality
        backgroundColor: "#ffffff", // Ensure white background
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure all elements are visible in cloned document
          const clonedElement = clonedDoc.getElementById("invoice-table");
          if (clonedElement) {
            clonedElement.style.height = 'auto';
            clonedElement.style.overflow = 'visible';
          }
        }
      });

      // PDF configuration
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margins = 10; // 10mm margins

      // Calculate image dimensions maintaining aspect ratio
      const imgWidth = pdfWidth - (margins * 2);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // If content is taller than page, create multiple pages
      if (imgHeight > pdfHeight - (margins * 2)) {
        let remainingHeight = canvas.height;
        let currentPosition = 0;

        while (remainingHeight > 0) {
          // Add new page if not first page
          if (currentPosition > 0) {
            pdf.addPage();
          }

          // Calculate height for current page
          const pageHeight = Math.min(
            remainingHeight,
            (pdfHeight - (margins * 2)) * (canvas.width / imgWidth)
          );

          pdf.addImage(
            canvas,
            "PNG",
            margins,
            currentPosition === 0 ? margins : 0,
            imgWidth,
            (pageHeight * imgWidth) / canvas.width,
            "",
            "FAST",
            0
          );

          remainingHeight -= pageHeight;
          currentPosition += pageHeight;
        }
      } else {
        // Content fits in one page
        pdf.addImage(
          canvas,
          "PNG",
          margins,
          margins,
          imgWidth,
          imgHeight,
          "",
          "FAST"
        );
      }

      // Generate file name with timestamp
      const fileName = `invoice-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error("Error generating PDF:", error);
      // You might want to add proper error handling/notification here
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      onClick={downloadPDF} 
      disabled={isGenerating}
      className="gap-2"
    >
      {isGenerating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <DownloadIcon className="h-4 w-4" />
      )}
      <span>
        {isGenerating ? "Generating PDF..." : "Download Invoice"}
      </span>
    </Button>
  );
};

export default DownloadInvoice;