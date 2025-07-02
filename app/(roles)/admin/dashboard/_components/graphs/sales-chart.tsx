"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { parseISO, format } from "date-fns";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GraphFilters from "./graph-filters";

// 🔹 Types
type Enrollment = {
  id: string;
  student: string;
  salesPerson: string;
  enrolledOn: string;
};

type ChartDataItem = {
  label: string;
  [salesPerson: string]: string | number;
};

// 🔹 Dummy Data
const dummyEnrollments: Enrollment[] = [
  { id: "1", student: "Alice", salesPerson: "John", enrolledOn: "2025-01-12" },
  { id: "2", student: "Bob", salesPerson: "Sara", enrolledOn: "2025-01-30" },
  { id: "3", student: "Charlie", salesPerson: "John", enrolledOn: "2025-02-10" },
  { id: "4", student: "David", salesPerson: "Sara", enrolledOn: "2025-03-05" },
  { id: "5", student: "Eva", salesPerson: "John", enrolledOn: "2025-04-18" },
  { id: "6", student: "Mike", salesPerson: "John", enrolledOn: "2025-04-20" },
  { id: "7", student: "Nina", salesPerson: "Sara", enrolledOn: "2025-05-02" },
  { id: "8", student: "Zara", salesPerson: "Zed", enrolledOn: "2025-06-01" },
];

export default function SalesOverTimeChart() {
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
    const filtered = dummyEnrollments.filter((item) => {
      const date = parseISO(item.enrolledOn);
      const itemYear = format(date, "yyyy");
      const itemMonth = format(date, "MM");

      const matchesYear = itemYear === year;
      const matchesMonth = month === "All" || itemMonth === month;
      const matchesStart = !startDate || date >= parseISO(startDate);
      const matchesEnd = !endDate || date <= parseISO(endDate);

      return matchesYear && matchesMonth && matchesStart && matchesEnd;
    });

    const grouped: Record<string, Record<string, number>> = {};

    filtered.forEach((item) => {
      const label =
        month === "All"
          ? format(parseISO(item.enrolledOn), "MMM")
          : format(parseISO(item.enrolledOn), "dd MMM");

      if (!grouped[label]) grouped[label] = {};
      grouped[label][item.salesPerson] = (grouped[label][item.salesPerson] || 0) + 1;
    });

    const chartData: ChartDataItem[] = Object.entries(grouped).map(([label, salesMap]) => ({
      label,
      ...salesMap,
    }));

    chartData.sort(
      (a, b) =>
        new Date(`01 ${a.label} ${year}`).getTime() -
        new Date(`01 ${b.label} ${year}`).getTime()
    );

    setData(chartData);
  }, [year, month, startDate, endDate]);

  const allSalesPeople = Array.from(
    new Set(dummyEnrollments.map((e) => e.salesPerson))
  );

  const colors = ["#10b981", "#3b82f6", "#f97316", "#9333ea", "#ef4444"];

  return (
    <Card className="w-full shadow ring ring-primary-bg/30 shadow-primary-bg/40">
      <CardHeader className="flex flex-col sm:justify-between sm:items-center gap-4">
        <CardTitle className="text-2xl">Salesperson-wise Enrollments</CardTitle>
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
            No enrollment data found for selected filters.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              {allSalesPeople.map((person, idx) => (
                <Bar
                  key={person}
                  dataKey={person}
                  stackId="a"
                  fill={colors[idx % colors.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
