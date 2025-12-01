"use client";
import React, { useState } from "react";

import { InvoiceData } from "@/lib/types/invoice";
import CreateInvoiceDialog from "./create-invoice-dialog";

import { StudentInfoCard } from "./student-info-card";
import { FeeSummaryCard } from "./fee-summary-card";
import { CourseCard } from "./course-card";
import { InvoiceTimelineCard } from "./invoice-timeline-card";
import { getInvoiceById } from "@/actions/admin/invoices/get-invoices"; // <-- add this

interface InvoiceDetailsProps {
  data: InvoiceData;
  invoiceId: string;
}

const InvoiceDetails = ({ data, invoiceId }: InvoiceDetailsProps) => {
  const [currentData, setCurrentData] = useState<InvoiceData>(data);
  const [loadingRefresh, setLoadingRefresh] = useState(false);

  // Fetch latest invoice data after a payment is recorded
  const handleInvoiceCreated = async () => {
    try {
      setLoadingRefresh(true);
      const res = await getInvoiceById(invoiceId);

      if (res.success && res.data) {
        setCurrentData(res.data);
      } else {
        console.error("Failed to refresh invoice data", res.message);
      }
    } catch (err) {
      console.error("Error refreshing invoice data", err);
    } finally {
      setLoadingRefresh(false);
    }
  };

  if (!currentData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex justify-center w-full bg-slate-50/50 p-4 md:p-6">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Invoice Details
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage student payments and generate invoices
            </p>
            {loadingRefresh && (
              <p className="text-xs text-slate-400 mt-1">
                Updating invoice details…
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <CreateInvoiceDialog
              invoiceData={currentData}
              invoiceId={invoiceId}
              onInvoiceCreated={handleInvoiceCreated}
            />
          </div>
        </div>

        <div className="space-y-6">
          <StudentInfoCard student={currentData.student} />
          <FeeSummaryCard summary={currentData.summary} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentData.courses.map((course, idx) => (
              <CourseCard key={idx} course={course} />
            ))}
          </div>

          <InvoiceTimelineCard history={currentData.paymentHistory} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
