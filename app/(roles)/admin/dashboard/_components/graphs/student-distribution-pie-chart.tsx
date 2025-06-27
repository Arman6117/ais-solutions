"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GraphFilters from "./graph-filters";
import chroma from "chroma-js";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// 🔹 Simulated backend data
const rawData = [
  { course: "DSA", batch: "Jan Batch", studentCount: 20 },
  { course: "DSA", batch: "Feb Batch", studentCount: 15 },
  { course: "Fullstack", batch: "March Web Dev", studentCount: 25 },
  { course: "Fullstack", batch: "React Pro", studentCount: 10 },
  { course: "Python", batch: "React Pro", studentCount: 12 },
  { course: "AI ML", batch: "React Pro", studentCount: 7 },
  { course: "Cyber Security", batch: "React Pro", studentCount: 9 },
  { course: "Cloud DevOps", batch: "React Pro", studentCount: 11 },
  { course: "Blockchain", batch: "React Pro", studentCount: 4 },
];

const StudentDistributionPieChart = () => {
  const [course, setCourse] = useState("All");
  const [batch, setBatch] = useState("All");

  // 🔄 Dynamically calculate available filter options
  const courseOptions = [
    ...Array.from(
      new Set(
        rawData
          .filter((d) => batch === "All" || d.batch === batch)
          .map((d) => d.course)
      )
    ),
  ];

  const batchOptions = [
    ...Array.from(
      new Set(
        rawData
          .filter((d) => course === "All" || d.course === course)
          .map((d) => d.batch)
      )
    ),
  ];

  // ⚠️ Reset invalid selections if needed
  useEffect(() => {
    if (course !== "All" && !courseOptions.includes(course)) {
      setCourse("All");
    }
    if (batch !== "All" && !batchOptions.includes(batch)) {
      setBatch("All");
    }
  }, [courseOptions, batchOptions]);

  // 🔍 Filter and group data
  const filtered = rawData.filter(
    (item) =>
      (course === "All" || item.course === course) &&
      (batch === "All" || item.batch === batch)
  );

  const groupedData: Record<string, number> = {};
  filtered.forEach((item) => {
    groupedData[item.course] =
      (groupedData[item.course] || 0) + item.studentCount;
  });

  const chartData = Object.entries(groupedData).map(([course, count]) => ({
    course,
    count,
  }));

  const total = chartData.reduce((sum, item) => sum + item.count, 0);

  // 🎨 Generate dynamic color mapping
  const uniqueCourses = chartData.map((item) => item.course);
  const colorScale = chroma
    .scale("Set3")
    .mode("lch")
    .colors(uniqueCourses.length);
  const courseColorMap: Record<string, string> = {};
  uniqueCourses.forEach((course, i) => {
    courseColorMap[course] = colorScale[i];
  });

  return (
    <Card className="md:w-1/2 ring ring-[#aaa1df]/30 shadow-[#aaa1df">
      <CardHeader className="flex flex-col items-center gap-4">
        <CardTitle className="text-2xl text-center">
          Student Distribution
        </CardTitle>
        <GraphFilters
          batch={batch}
          setBatch={setBatch}
          course={course}
          setCourse={setCourse}
          batchOptions={batchOptions}
          courseOptions={courseOptions}
        />
      </CardHeader>

      <CardContent className="h-[350px] w-full flex flex-col items-center justify-center">
        {total === 0 ? (
          <div className="text-muted-foreground text-sm">
            No student data available for the selected filters.
          </div>
        ) : (
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
                      <Cell
                        key={entry.course}
                        fill={courseColorMap[entry.course]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value} students`} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Total */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center text-sm font-medium text-muted-foreground">
                  <div className="text-xl font-semibold text-black">
                    {total}
                  </div>
                  <div className="text-xs">Total Students</div>
                </div>
              </div>
            </div>

            {/* 🧭 Legend */}
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
};

export default StudentDistributionPieChart;
