"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GraphFilters from "./graph-filters";
import chroma from "chroma-js";
type FeeRecord = {
  course: string;
  batch: string;
  status: "Paid" | "Partially Paid" | "Unpaid";
  count: number;
};

const rawData: FeeRecord[] = [
  { course: "DSA", batch: "Jan Batch", status: "Paid", count: 20 },
  { course: "DSA", batch: "Jan Batch", status: "Partially Paid", count: 5 },

  { course: "DSA", batch: "Feb Batch", status: "Paid", count: 10 },
  { course: "DSA", batch: "Feb Batch", status: "Paid", count: 2 },

  { course: "Fullstack", batch: "March Web Dev", status: "Paid", count: 15 },
  {
    course: "Fullstack",
    batch: "March Web Dev",
    status: "Partially Paid",
    count: 8,
  },
  {
    course: "Fullstack",
    batch: "March Web Dev",
    status: "Partially Paid",
    count: 5,
  },

  { course: "Python", batch: "React Pro", status: "Paid", count: 7 },
  { course: "Python", batch: "React Pro", status: "Partially Paid", count: 2 },
];

export default function FeeStatusDonutChart() {
  const [course, setCourse] = useState("All");
  const [batch, setBatch] = useState("All");
  const filteredData = rawData.filter((item) => {
    return (
      (course === "All" || item.course === course) &&
      (batch === "All" || item.batch === batch)
    );
  });

  const groupedData: Record<string, number> = {};
  filteredData.forEach((item) => {
    groupedData[item.status] = (groupedData[item.status] || 0) + item.count;
  });
  const data = Object.entries(groupedData).map(([status, count]) => ({
    status,
    count,
  }));
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const resetFilters = () => {
    setCourse("All");
    setBatch("All");
  };

  const uniqueCourses = data.map((item) => item.status);
  const colorScale = chroma
    .scale("Set3")
    .mode("lch")
    .colors(uniqueCourses.length);
  const statusColorMap: Record<string, string> = {};
  uniqueCourses.forEach((course, i) => {
    statusColorMap[course] = colorScale[i];
  });
  return (
    <Card className="md:w-1/2 ring ring-[#eab308]/30 shadow-[#eab308]/20">
      <CardHeader className="flex flex-col items-center gap-4">
        <CardTitle className="text-2xl text-center">
          Fee Collection Status
        </CardTitle>
        <GraphFilters
          course={course}
          setCourse={setCourse}
          batch={batch}
          setBatch={setBatch}
          resetFilters={resetFilters}
          courseOptions={["DSA", "Fullstack", "Python"]}
          batchOptions={[
            "Jan Batch",
            "Feb Batch",
            "March Web Dev",
            "React Pro",
          ]}
        />
      </CardHeader>

      <CardContent className="h-[350px] w-full flex flex-col items-center justify-center">
        {total === 0 ? (
          <div className="text-muted-foreground text-sm">
            No fee data available for the selected filters.
          </div>
        ) : (
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
                      <Cell
                        key={entry.status}
                        fill={statusColorMap[entry.status]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value} students`} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center total text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center text-sm font-medium text-muted-foreground">
                  <div className="text-xl font-semibold text-black">
                    {total}
                  </div>
                  <div className="text-xs">Total Students</div>
                </div>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="flex gap-4 mt-6 text-sm">
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
