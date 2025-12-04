"use client";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/data-table";
// import { invoicesData } from "@/lib/static"; // your invoice data + type
import { Badge } from "@/components/ui/badge";
import { InvoiceTable as InvoiceTableType, InvoiceStatus, PaymentMode } from "@/lib/types/types";
import InvoiceTableFilters from "../../students/_components/invoice-table-filters";
import { cn } from "@/lib/utils";
import { getInvoiceTable } from "@/actions/admin/invoices/get-invoices";
import { format } from "date-fns";

const InvoiceTable = () => {
  const [invoicesData, setInvoicesData] = useState<InvoiceTableType[]>([]);
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "all">(
    "all"
  );
  const [paymentModeFilter, setPaymentModeFilter] = useState<
    PaymentMode | "all"
  >("all");

  const fetchInvoices = async() => {
    try {
      
     const res=  await getInvoiceTable();
     
     setInvoicesData(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=> {
    fetchInvoices()
  },[])


  const filteredInvoices = useMemo(() => {
    return invoicesData.filter((invoice) => {
      if (statusFilter !== "all" && invoice.status !== statusFilter)
        return false;
      if (
        paymentModeFilter !== "all" &&
        invoice.paymentMode !== paymentModeFilter
      )
        return false;
      return true;
    });
  }, [statusFilter, paymentModeFilter, invoicesData]);

  const invoiceTableCols = [
    {
      id: "studentName",
      header: "Student Name",
      accessor: (row: InvoiceTableType) => row.studentId.name,
    },
    {
      id: "email",
      header: "Email",
      accessor: (row: InvoiceTableType) => row.studentId.email,
    },
    {
      id: "courseName",
      header: "Course",
      accessor: (row: InvoiceTableType) => (
        <div className="flex flex-wrap gap-1">
          {row.studentId.courses.map((course, i) => (
            <span
              key={i}
              className="bg-muted text-sm px-2 py-1 rounded-md border border-border text-foreground"
            >
              {course.courseId.courseName}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: "amountPaid",
      header: "Paid",
      accessor: (row: InvoiceTableType) => `₹${row.amountPaid}`,
    },
    {
      id: "totalFee",
      header: "Total Fee",
      accessor: (row: InvoiceTableType) => `₹${row.totalFees}`,
    },
    // {
    //   id: "paymentMode",
    //   header: "Mode",
    //   accessor: (row: InvoiceTableType) => row.pay,
    // },
    {
      id: "status",
      header: "Status",
      accessor: (row: InvoiceTableType) => (
        <Badge
          className={cn(
            "text-xs px-2 py-1 rounded-md",
            row.status === "Paid" &&
              "bg-green-100 text-green-700 border border-green-300",
            row.status === "Due" &&
              "bg-yellow-100 text-yellow-800 border border-yellow-300",
            row.status === "Overdue" &&
              "bg-red-100 text-red-700 border border-red-300"
          )}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      id: "createdAt",
      header: "Date",
      accessor: (row: InvoiceTableType) =>{
        if (!row.createdAt) return "N/A"; 
        
      return format(new Date(row.createdAt), "PP");
      }
    },
  ];

  const sortOptions = [
    { label: "Date: Newest", value: "createdAt-desc" },
    { label: "Date: Oldest", value: "createdAt-asc" },
    { label: "Amount Paid: High to Low", value: "amountPaid-desc" },
    { label: "Amount Paid: Low to High", value: "amountPaid-asc" },
  ];

  const uniqueStatuses = useMemo(() => {
    return Array.from(new Set(invoicesData.map((i) => i.status)));
  }, [invoicesData]);

  const uniquePaymentModes = useMemo(() => {
    return Array.from(new Set(invoicesData.map((i) => i.paymentMode)));
  }, [invoicesData]);

  return (
    <DataTable
      columns={invoiceTableCols}
      data={filteredInvoices}
      getRowId={(row: InvoiceTableType) => row._id}
      href="/admin/invoices/invoice-details"
      filterOptions={sortOptions}
      searchPlaceholder="Search by student or course"
      additionalFilter={
        <InvoiceTableFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          uniqueStatuses={uniqueStatuses}
          paymentModeFilter={paymentModeFilter}
          setPaymentModeFilter={setPaymentModeFilter}
          uniquePaymentModes={uniquePaymentModes}
        />
      }
      onDeleteSelected={(ids) =>
        toast.success(`${ids.length} invoices deleted successfully`)
      }
    />
  );
};

export default InvoiceTable;
