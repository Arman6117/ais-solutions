"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GraphFilters from "./graph-filters";
import chroma from "chroma-js";
import { getFeeStatusData, getFilterOptions } from "@/actions/admin/dashboard/get-graph-data"; // Import Actions
import { Loader2 } from "lucide-react";

type ChartData = {
  status: string;
  count: number;
};

export default function FeeStatusDonutChart() {
  const [course, setCourse] = useState("All");
  const [batch, setBatch] = useState("All");
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [courseOptions, setCourseOptions] = useState<string[]>([]);
  const [batchOptions, setBatchOptions] = useState<string[]>([]);

  // 1. Fetch Filter Options (Courses/Batches)
  useEffect(() => {
    const fetchOpts = async () => {
        const opts = await getFilterOptions();
        setCourseOptions(opts.courses);
        setBatchOptions(opts.batches);
    };
    fetchOpts();
  }, []);

  // 2. Fetch Graph Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getFeeStatusData(course, batch);
        setData(res);
      } catch (error) {
        console.error("Error fetching fee data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [course, batch]);

  const resetFilters = () => {
    setCourse("All");
    setBatch("All");
  };

  const total = data.reduce((sum, item) => sum + item.count, 0);
  
  const uniqueStatuses = data.map((item) => item.status);
  const colorScale = chroma.scale("Set3").mode("lch").colors(Math.max(uniqueStatuses.length, 1));
  const statusColorMap: Record<string, string> = {};
  uniqueStatuses.forEach((status, i) => {
    statusColorMap[status] = colorScale[i];
  });

  return (
    <Card className="md:w-1/2 w-full ring ring-[#eab308]/30 shadow-[#eab308]/20">
      <CardHeader className="flex flex-col items-center gap-4">
        <CardTitle className="text-2xl text-center">Fee Collection Status</CardTitle>
        <GraphFilters
          course={course}
          setCourse={setCourse}
          batch={batch}
          setBatch={setBatch}
          resetFilters={resetFilters}
          courseOptions={courseOptions}
          batchOptions={batchOptions}
        />
      </CardHeader>

      <CardContent className="h-[350px] w-full flex flex-col items-center justify-center relative">
        {loading && (
            <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-bg" />
            </div>
        )}

        {!loading && total === 0 ? (
          <div className="text-muted-foreground text-sm">
            No fee data available for the selected filters.
          </div>
        ) : !loading && (
          <>
            <div className="relative w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    label={({ percent, status }) =>
                      `${status}: ${percent ? (percent * 100).toFixed(0) : 0}%`
                    }
                    labelLine={true}
                  >
                    {data.map((entry) => (
                      <Cell key={entry.status} fill={statusColorMap[entry.status]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value} invoices`} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center total text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center text-sm font-medium text-muted-foreground">
                  <div className="text-xl font-semibold text-black">{total}</div>
                  <div className="text-xs">Total Invoices</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6 text-sm flex-wrap justify-center">
              {data.map((item) => (
                <div key={item.status} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: statusColorMap[item.status] }}
                  />
                  <span>{item.status}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
