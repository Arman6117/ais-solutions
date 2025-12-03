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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { parseISO, format } from "date-fns";
import GraphFilters from "./graph-filters";
import { getNewStudentRegistrations } from "@/actions/admin/dashboard/get-graph-data"; // Import the action
import { Loader2 } from "lucide-react";

type ChartDataItem = {
  label: string;
  students: number;
};

export default function NewStudentRegistrationsChart() {
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
        const rawData = await getNewStudentRegistrations(year, month, startDate, endDate);
        
        // 2. Process Data for Chart
        const grouped: Record<string, number> = {};
        
        rawData.forEach((item) => {
          // If Month is "All", group by Month Name (Jan, Feb)
          // If specific Month is selected, group by Day (01 Jan, 02 Jan)
          const label =
            month === "All"
              ? format(parseISO(item.date), "MMM")
              : format(parseISO(item.date), "dd MMM");
              
          grouped[label] = (grouped[label] || 0) + 1;
        });

        const chartData = Object.entries(grouped).map(([label, students]) => ({
          label,
          students,
        }));

        // 3. Sort Data chronologically
        chartData.sort((a, b) => {
           if (month === "All") {
              const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              return months.indexOf(a.label) - months.indexOf(b.label);
           }
           // If grouped by day (e.g. "01 Jan"), simple string/date sort works or parseInt the day
           return parseInt(a.label) - parseInt(b.label);
        });

        setData(chartData);
      } catch (error) {
        console.error("Failed to fetch graph data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, month, startDate, endDate]);

  return (
    <Card className="w-full ring ring-[#6366f1]/30 shadow-[#6366f1]/20">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
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

      <CardContent className="h-[400px] w-full relative">
        {loading && (
            <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-bg" />
            </div>
        )}

        {!loading && data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No student registrations found for selected filters.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
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
