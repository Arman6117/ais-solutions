import React from "react";
import InvoiceDetails from "../_components/invoice-details";

type InvoiceDetailsPageProps = {
  params: Promise<{ id: string }>;
};
const InvoiceDetailsPage =async ({params}:InvoiceDetailsPageProps) => {
const id = (await params).id
  return <>
  <InvoiceDetails/>
  </>;
};

export default InvoiceDetailsPage;
