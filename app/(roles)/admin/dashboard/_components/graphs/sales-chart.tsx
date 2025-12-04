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
import { getSalesEnrollmentsGraph } from "@/actions/admin/dashboard/get-sales-person-graph";
import { Loader2 } from "lucide-react";

// 🔹 Types
type Enrollment = {
  id: string;
  salesPerson: string; // Grouping Key
  enrolledOn: string;
};

type ChartDataItem = {
  label: string;
  [salesPerson: string]: string | number;
};

export default function SalesOverTimeChart() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const [rawData, setRawData] = useState<Enrollment[]>([]);
  const [data, setData] = useState<ChartDataItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data on Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSalesEnrollmentsGraph();
        if (res.success) {
          setRawData(res.data);
        }
      } catch (error) {
        console.error("Failed to load graph data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const resetFilters = () => {
    setYear(new Date().getFullYear().toString());
    setMonth("All");
    setStartDate("");
    setEndDate("");
  };

  // 2. Process Data when filters or rawData changes
  useEffect(() => {
    if (rawData.length === 0) {
        setData([]);
        return;
    }

    const filtered = rawData.filter((item) => {
      const date = parseISO(item.enrolledOn);
      const itemYear = format(date, "yyyy");
      const itemMonth = format(date, "MM"); // "01", "02"...

      const matchesYear = itemYear === year;
      // Filter logic: If Month is "All", ignore month check. 
      // If Month is selected (e.g. "01"), check match.
      const matchesMonth = month === "All" || itemMonth === month; 
      
      const matchesStart = !startDate || date >= parseISO(startDate);
      const matchesEnd = !endDate || date <= parseISO(endDate);

      return matchesYear && matchesMonth && matchesStart && matchesEnd;
    });

    const grouped: Record<string, Record<string, number>> = {};

    filtered.forEach((item) => {
      // X-Axis Label: If showing one month, show Days. If showing whole year, show Months.
      let label = "";
      const date = parseISO(item.enrolledOn);
      
      if (month !== "All") {
         // Daily view for a specific month
         label = format(date, "dd MMM"); 
      } else {
         // Monthly view for the year
         label = format(date, "MMM"); 
      }

      if (!grouped[label]) grouped[label] = {};
      grouped[label][item.salesPerson] = (grouped[label][item.salesPerson] || 0) + 1;
    });

    const chartData: ChartDataItem[] = Object.entries(grouped).map(([label, salesMap]) => ({
      label,
      ...salesMap,
    }));

    // Sort Logic
    chartData.sort((a, b) => {
        // Generic sort helper
        // If labels are "Jan", "Feb" -> convert to date to sort
        // If labels are "01 Jan", "02 Jan" -> convert to date
        const dateA = new Date(`${a.label} ${year}`).getTime();
        const dateB = new Date(`${b.label} ${year}`).getTime();
        return dateA - dateB;
    });

    setData(chartData);
  }, [year, month, startDate, endDate, rawData]);

  // Get unique list of sales persons for dynamic Bar colors
  const allSalesPeople = Array.from(
    new Set(rawData.map((e) => e.salesPerson))
  );

  const colors = ["#8b5cf6", "#ec4899", "#10b981", "#f59e0b", "#3b82f6", "#6366f1"];

  return (
    <Card className="w-full shadow ring ring-primary-bg/30 shadow-primary-bg/40">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle className="text-2xl">Salesperson Performance</CardTitle>
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
        {loading ? (
            <div className="h-full flex items-center justify-center">
                <Loader2 className="animate-spin text-violet-600 h-8 w-8" />
            </div>
        ) : data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No enrollments found for the selected period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" stroke="#6b7280" fontSize={12} />
              <YAxis allowDecimals={false} stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                itemStyle={{ fontSize: '12px', fontWeight: 500 }}
              />
              <Legend />
              {allSalesPeople.map((person, idx) => (
                <Bar
                  key={person}
                  dataKey={person}
                  stackId="a" // Stacked bar chart
                  fill={colors[idx % colors.length]}
                  name={person}
                  radius={[4, 4, 0, 0]} // Rounded top corners
                  barSize={40}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
