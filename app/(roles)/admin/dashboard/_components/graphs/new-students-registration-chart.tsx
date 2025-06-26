"use client";

import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { parseISO, format } from "date-fns";
import { CalendarRange } from "lucide-react";
import GraphFilters from "./graph-filters";

type RawDataItem = {
  date: string;
  students: number;
};

type ChartDataItem = {
  label: string;
  students: number;
};

const dummyData: RawDataItem[] = [
  { date: "2025-01-12", students: 12 },
  { date: "2025-01-28", students: 28 },
  { date: "2025-02-10", students: 40 },
  { date: "2025-03-15", students: 50 },
  { date: "2025-03-30", students: 70 },
  { date: "2025-04-05", students: 30 },
  { date: "2025-05-08", students: 25 },
  { date: "2025-06-01", students: 35 },
  { date: "2025-06-15", students: 40 },
];

export default function NewStudentRegistrationsChart() {
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
      grouped[label] = (grouped[label] || 0) + item.students;
    });

    const chartData = Object.entries(grouped).map(([label, students]) => ({
      label,
      students,
    }));

    // Sort labels (basic sort based on date)
    chartData.sort(
      (a, b) =>
        new Date(`01 ${a.label} ${year}`).getTime() -
        new Date(`01 ${b.label} ${year}`).getTime()
    );

    setData(chartData);
  }, [year, month, startDate, endDate]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm: justify-between sm:items-center gap-4">
        <CardTitle className="text-2xl">New Student Registrations</CardTitle>

        <GraphFilters
          endDate={endDate}
          month={month}
          setEndDate={setEndDate}
          setMonth={setMonth}
          setStartDate={setStartDate}
          setYear={setYear}
          startDate={startDate}
          year={year}
          resetFilters={resetFilters}
        />
      </CardHeader>

      <CardContent className="h-[400px] w-full">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No student registrations found for selected filters.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="students"
                stroke="#6366f1"
                fill="#c7d2fe"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
