"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { parseISO, format } from "date-fns";
import GraphFilters from "./graph-filters";
import { getRevenueData } from "@/actions/admin/dashboard/get-graph-data"; // Import action
import { Loader2 } from "lucide-react";

type ChartDataItem = {
  label: string;
  amount: number;
};

export default function RevenueOverTimeChart() {
  // Default to current year
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const [data, setData] = useState<ChartDataItem[]>([]);
  const [loading, setLoading] = useState(false);

  const resetFilters = () => {
    setYear(new Date().getFullYear().toString());
    setMonth("All");
    setStartDate("");
    setEndDate("");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Call Server Action
        const rawData = await getRevenueData(year, month, startDate, endDate);

        // 2. Process Data
        const grouped: Record<string, number> = {};
        
        rawData.forEach((item) => {
          const label =
            month === "All"
              ? format(parseISO(item.date), "MMM") // Group by Month (Jan, Feb)
              : format(parseISO(item.date), "dd MMM"); // Group by Day (01 Jan)
              
          grouped[label] = (grouped[label] || 0) + item.amount;
        });

        const chartData = Object.entries(grouped).map(([label, amount]) => ({
          label,
          amount,
        }));

        // 3. Sort Data
        chartData.sort((a, b) => {
           if (month === "All") {
              const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              return months.indexOf(a.label) - months.indexOf(b.label);
           }
           return parseInt(a.label) - parseInt(b.label);
        });

        setData(chartData);
      } catch (error) {
        console.error("Failed to fetch revenue data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, month, startDate, endDate]);

  return (
    <Card className="w-full shadow ring ring-[#10b981]/30 shadow-[#10b981]/20">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <CardTitle className="text-2xl">Revenue Over Time</CardTitle>
        
        <GraphFilters
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          resetFilters={resetFilters}
        />
      </CardHeader>

      <CardContent className="h-[400px] w-full relative">
        {loading && (
            <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-bg" />
            </div>
        )}

        {!loading && data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No revenue data found for selected filters.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
