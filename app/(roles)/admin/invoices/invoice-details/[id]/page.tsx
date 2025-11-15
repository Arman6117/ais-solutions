import React from "react";
import InvoiceDetails from "../_components/invoice-details";
import { getInvoiceById } from "@/actions/admin/invoices/get-invoices";

type InvoiceDetailsPageProps = {
  params: Promise<{ id: string }>;
};
const InvoiceDetailsPage =async ({params}:InvoiceDetailsPageProps) => {
const id = (await params).id
const res = await getInvoiceById(id)
console.log(res.data)
console.log(id)
  return <>
  <InvoiceDetails/>
  </>;
};

export default InvoiceDetailsPage;
