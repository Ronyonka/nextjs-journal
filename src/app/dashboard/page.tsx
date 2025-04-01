"use client";

import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useRouter } from "next/navigation";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState({
    heatmap: [],
    categoryDistribution: [],
    wordCountByCategory: [],
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/dashboard");
      if (response.status === 401) {
        router.push("/login"); // Redirect unauthorized users to login
      } else {
        const result = await response.json();
        setData(result);
      }
    }

    fetchData();
  }, [router]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Analyze your journaling patterns and trends.
      </p>

      {/* Entry Frequency Heatmap */}
      <div className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Entry Frequency</h2>
        <CalendarHeatmap
          startDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 1))
          }
          endDate={new Date()}
          values={data.heatmap}
          classForValue={(value) => {
            if (!value) return "color-empty";
            return `color-scale-${value.count}`;
          }}
          tooltipDataAttrs={(value) => ({
            "data-tip": `${value.date}: ${value.count} entries`,
          })}
        />
      </div>

      {/* Category Distribution Pie Chart */}
      <div className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Category Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.categoryDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.categoryDistribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Word Count by Category */}
      <div className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Word Count by Category</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.wordCountByCategory.map((category) => (
            <div
              key={category.name}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Total Words:
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {category.wordCount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
