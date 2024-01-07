"use client";

import { Card, DonutChart, Title } from "@tremor/react";
import { useState } from "react";

function GradeChart() {
  const [value, setValue] = useState(null);
  const grades = [
    {
      grade: "A",
      credits: 15,
    },
    {
      grade: "A-",
      credits: 40,
    },
    {
      grade: "B",
      credits: 40,
    },
    {
      grade: "B-",
      credits: 10,
    },
    {
      grade: "C",
      credits: 15,
    },
    {
      grade: "C-",
      credits: 10,
    },
    {
      grade: "D",
      credits: 5,
    },
    {
      grade: "E",
      credits: 2,
    },
  ];

  const valueFormatter = (number: number) =>
    `Grade: ${new Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <Card className="bg-transparent border-none ring-0 !shadow-none outline-none blur-none p-0 w-full flex items-start justify-center">
      <div>
        <Title className="text-indigo-700">Grade Summary</Title>
        <DonutChart
          className="mt-6 w-[380px] h-[380px] drop-shadow-none"
          data={grades}
          category="credits"
          showAnimation={true}
          variant="pie"
          index="grade"
          valueFormatter={valueFormatter}
          colors={[
            "blue-900",
            "blue-800",
            "blue-700",
            "blue-600",
            "blue-500",
            "blue-400",
            "blue-300",
            "blue-200",
          ]} // Colors in order of data list
          onValueChange={(v) => setValue(v)}
        />
      </div>
    </Card>
  );
}

export default GradeChart;
