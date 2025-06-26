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


type RevenueData = {
  date: string;
  amount: number;
};

type ChartDataItem = {
  label: string;
  amount: number;
};

const dummyData: RevenueData[] = [
  { date: "2025-01-12", amount: 10000 },
  { date: "2025-01-30", amount: 5000 },
  { date: "2025-02-10", amount: 15000 },
  { date: "2025-03-05", amount: 7000 },
  { date: "2025-04-18", amount: 12000 },
  { date: "2025-05-02", amount: 18000 },
  { date: "2025-06-15", amount: 20000 },
];

export default function RevenueOverTimeChart() {
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState<ChartDataItem[]>([]);

  const resetFilters = () => {
    setYear("2025");
    setMonth("All");
    setStartDate("");
    setEndDate("");
  };

  useEffect(() => {
    const filtered = dummyData.filter((item) => {
      const itemDate = parseISO(item.date);
      const itemYear = format(itemDate, "yyyy");
      const itemMonth = format(itemDate, "MM");

      const matchesYear = itemYear === year;
      const matchesMonth = month === "All" || itemMonth === month;
      const matchesStart = !startDate || itemDate >= parseISO(startDate);
      const matchesEnd = !endDate || itemDate <= parseISO(endDate);

      return matchesYear && matchesMonth && matchesStart && matchesEnd;
    });

    const grouped: Record<string, number> = {};
    filtered.forEach((item) => {
      const label =
        month === "All"
          ? format(parseISO(item.date), "MMM")
          : format(parseISO(item.date), "dd MMM");
      grouped[label] = (grouped[label] || 0) + item.amount;
    });

    const chartData = Object.entries(grouped).map(([label, amount]) => ({
      label,
      amount,
    }));

    chartData.sort(
      (a, b) =>
        new Date(`01 ${a.label} ${year}`).getTime() -
        new Date(`01 ${b.label} ${year}`).getTime()
    );

    setData(chartData);
  }, [year, month, startDate, endDate]);

  return (
    <Card className="w-full shadow ring ring-[#10b981]/30 shadow-[#10b981]/20">
      <CardHeader className="flex flex-col sm: justify-between sm:items-center gap-4">
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

      <CardContent className="h-[400px] w-full">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No revenue data found for selected filters.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip formatter={(value: number) => `₹${value}`} />
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
