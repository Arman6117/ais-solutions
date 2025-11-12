"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { InvoiceStatus, PaymentMode } from "@/lib/types/types";

interface InvoiceTableFiltersProps {
  statusFilter: InvoiceStatus | "all";
  paymentModeFilter: PaymentMode | "all";
  setStatusFilter: (val: InvoiceStatus | "all") => void;
  setPaymentModeFilter: (val: PaymentMode | "all") => void;
  uniqueStatuses: InvoiceStatus[];
  uniquePaymentModes: PaymentMode[];
}

const InvoiceTableFilters: React.FC<InvoiceTableFiltersProps> = ({
  statusFilter,
  paymentModeFilter,
  setStatusFilter,
  setPaymentModeFilter,
  uniqueStatuses,
  uniquePaymentModes,
}) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {/* Status Filter */}
      <Select
        value={statusFilter}
        onValueChange={(val) => setStatusFilter(val as InvoiceStatus | "all")}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {uniqueStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Payment Mode Filter */}
      <Select
        value={paymentModeFilter}
        onValueChange={(val) =>
          setPaymentModeFilter(val as PaymentMode | "all")
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Payment mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Modes</SelectItem>
          {uniquePaymentModes.map((mode,i) => (
            <SelectItem key={i} value={mode}>
              {mode}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default InvoiceTableFilters;
