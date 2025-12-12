import { InvoiceWithCustomer } from "@/types/invoice";
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    marginBottom: 20,
  },
  logo: {
    width: "60px",
    height: "60px",
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  table: {
    width: "100%",
    marginTop: 10,
  },
  tableHeader: {
    borderBottom: "1px solid #ccc",
    paddingBottom: 6,
  },
  tableRow: {
    borderBottom: "1px solid #eee",
    paddingVertical: 8,
  },
  cellItem: { width: "50%" },
  cellQty: { width: "15%", textAlign: "right" },
  cellPrice: { width: "15%", textAlign: "right" },
  cellAmount: { width: "20%", textAlign: "right" },
  totals: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footer: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#666",
    borderTop: "1px solid #ccc",
    paddingTop: 10,
  },
});

// ----------------------
// MAIN PDF COMPONENT
// ----------------------

interface InvoicePDFProps {
  invoiceNo: string;
  date: string;
  dueDate: string;
  issuedTo: {
    name: string;
    address?: string;
    email?: string;
  };
  items: InvoiceWithCustomer[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}

export default function InvoiceListPDF(props: InvoicePDFProps) {
  const {
    invoiceNo,
    date,
    dueDate,
    issuedTo,
    items,
    subtotal,
    tax,
    discount,
    total,
  } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.row}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
            style={styles.logo}
          />

          <View>
            <Text>Invoice Listing</Text>
          </View>

          <View>
            <Text>Tailwind Inc.</Text>
            <Text>sales@tailwindcss.com</Text>
            <Text>+41-442341232</Text>
            <Text>VAT: 8657671212</Text>
          </View>
        </View>

        {/* Bill To */}
        {/* <View style={[styles.section, styles.row]}>
          <View>
            <Text style={styles.heading}>Bill To</Text>
            <Text>{issuedTo.name}</Text>
            {issuedTo.address && <Text>{issuedTo.address}</Text>}
            {issuedTo.email && <Text>{issuedTo.email}</Text>}
          </View>

          <View>
            <Text>Invoice No: {invoiceNo}</Text>
            <Text>Date: {date}</Text>
            <Text>Due: {dueDate}</Text>
          </View>
        </View> */}

        {/* Items Table */}
        <View style={styles.table}>
          {/* Header */}
          <View style={[styles.row, styles.tableHeader]}>
            <Text style={styles.cellItem}>Customer Name</Text>
            <Text style={styles.cellItem}>Description</Text>
            <Text style={styles.cellQty}>Qty</Text>
            <Text style={styles.cellPrice}>Price</Text>
            <Text style={styles.cellAmount}>Amount</Text>
          </View>

          {/* Map backend items directly */}
          {items.map((item, i) => {
            const price = item.unitPrice; // backend → PDF
            const qty = item.quantity;
            const amount = qty * price;

            return (
              <View key={i} style={[styles.row, styles.tableRow]}>
                <View style={styles.cellItem}>
                  <Text>{item.customer.name}</Text>
                </View>

                <View style={styles.cellItem}>
                  <Text>{item.description}</Text>
                </View>

                <Text style={styles.cellQty}>{qty}</Text>
                <Text style={styles.cellPrice}>${price.toFixed(2)}</Text>
                <Text style={styles.cellAmount}>${amount.toFixed(2)}</Text>
              </View>
            );
          })}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View>
            <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
            <Text>Tax: ${tax.toFixed(2)}</Text>
            <Text>Discount: -{discount}%</Text>
            <Text style={{ marginTop: 6, fontWeight: "bold" }}>
              Total: ${total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Footer */}
        {/* <Text style={styles.footer}>
          Please pay before the due date. You can pay by logging into your
          client portal.
        </Text> */}
      </Page>
    </Document>
  );
}
