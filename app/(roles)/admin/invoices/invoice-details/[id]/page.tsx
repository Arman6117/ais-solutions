import React from "react";
import InvoiceDetails from "../_components/invoice-details";
import { getInvoiceById } from "@/actions/admin/invoices/get-invoices";

type InvoiceDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const InvoiceDetailsPage = async ({ params }: InvoiceDetailsPageProps) => {
  const id = (await params).id;
  const res = await getInvoiceById(id);

  if (!res.success || !res.data) {
    return <div>Invoice not found</div>;
  }


  return (
    <>
      {/* Pass the fetched data directly to the client component */}
      <InvoiceDetails data={res.data} invoiceId={id} />
    </>
  );
};

export default InvoiceDetailsPage;
