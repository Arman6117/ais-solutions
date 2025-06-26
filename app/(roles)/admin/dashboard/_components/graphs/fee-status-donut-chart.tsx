"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Dummy data representing fee statuses
const data = [
  { status: "Paid", count: 45 },
  { status: "Partially Paid", count: 20 },
  { status: "Unpaid", count: 10 },
];

// Color mapping for each fee status
const COLORS: Record<string, string> = {
  Paid: "#22c55e",            // Green
  "Partially Paid": "#eab308", // Yellow
  Unpaid: "#ef4444",          // Red
};

export default function FeeStatusDonutChart() {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Fee Collection Status</CardTitle>
        
      </CardHeader>

      <CardContent className="h-[350px] flex justify-center items-center">
        {total === 0 ? (
          <div className="text-muted-foreground text-sm">
            No fee data available for the selected filters.
          </div>
        ) : (
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
                  `${status}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.status}
                    fill={COLORS[entry.status]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value} students`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
