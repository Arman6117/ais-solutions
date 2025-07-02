import React from "react";
import InvoicesTable from "./_components/invoices-table";

const PaymentsPage = () => {
  return (
    <main className="p-3 w-full">
      <div className="flex w-full justify-between">
        <h1 className="text-5xl font-bold">Manage Invoices</h1>
      </div>
      <div className="mt-10">
        <InvoicesTable/>
      </div>
    </main>
  );
};

export default PaymentsPage;
