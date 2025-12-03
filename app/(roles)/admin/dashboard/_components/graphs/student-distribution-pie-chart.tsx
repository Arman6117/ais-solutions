"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GraphFilters from "./graph-filters";
import chroma from "chroma-js";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getStudentDistributionData } from "@/actions/admin/dashboard/get-graph-data"; // Import Action
import { Loader2 } from "lucide-react";

type DistData = {
  course: string;
  batch: string;
  studentCount: number;
};

export default function StudentDistributionPieChart() {
  const [rawData, setRawData] = useState<DistData[]>([]);
  const [course, setCourse] = useState("All");
  const [batch, setBatch] = useState("All");
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data Once
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getStudentDistributionData();
        setRawData(data);
      } catch (error) {
        console.error("Error fetching distribution:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Calculate Options Client-Side (since we have all data)
  const courseOptions = Array.from(
    new Set(rawData.filter((d) => batch === "All" || d.batch === batch).map((d) => d.course))
  );

  const batchOptions = Array.from(
    new Set(rawData.filter((d) => course === "All" || d.course === course).map((d) => d.batch))
  );

  // Reset invalid filters
  useEffect(() => {
    if (course !== "All" && !courseOptions.includes(course)) setCourse("All");
    if (batch !== "All" && !batchOptions.includes(batch)) setBatch("All");
  }, [courseOptions, batchOptions, course, batch]);

  // 3. Filter Data
  const filtered = rawData.filter(
    (item) =>
      (course === "All" || item.course === course) &&
      (batch === "All" || item.batch === batch)
  );

  // 4. Group Data
  const groupedData: Record<string, number> = {};
  filtered.forEach((item) => {
    groupedData[item.course] = (groupedData[item.course] || 0) + item.studentCount;
  });

  const chartData = Object.entries(groupedData).map(([courseName, count]) => ({
    course: courseName,
    count,
  }));

  const total = chartData.reduce((sum, item) => sum + item.count, 0);

  // Colors
  const uniqueCourses = chartData.map((item) => item.course);
  const colorScale = chroma.scale("Set3").mode("lch").colors(Math.max(uniqueCourses.length, 1));
  const courseColorMap: Record<string, string> = {};
  uniqueCourses.forEach((c, i) => {
    courseColorMap[c] = colorScale[i];
  });

  return (
    <Card className="md:w-1/2 w-full ring ring-[#aaa1df]/30 shadow-[#aaa1df]">
      <CardHeader className="flex flex-col items-center gap-4">
        <CardTitle className="text-2xl text-center">Student Distribution</CardTitle>
        <GraphFilters
          batch={batch}
          setBatch={setBatch}
          course={course}
          setCourse={setCourse}
          batchOptions={batchOptions}
          courseOptions={courseOptions}
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
            No student data available for the selected filters.
          </div>
        ) : !loading && (
          <>
            <div className="relative h-auto w-full">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="count"
                    nameKey="course"
                    label={({ course, percent = 0 }) =>
                      `${course} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.course} fill={courseColorMap[entry.course]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value} students`} />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center text-sm font-medium text-muted-foreground">
                  <div className="text-xl font-semibold text-black">{total}</div>
                  <div className="text-xs">Total Students</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-4 text-sm flex-wrap justify-center">
              {chartData.map((item) => (
                <div key={item.course} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: courseColorMap[item.course] }}
                  />
                  <span>{item.course}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
