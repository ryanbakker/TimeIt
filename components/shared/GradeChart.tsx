"use client";

import { Card, DonutChart, Title } from "@tremor/react";
import { useState } from "react";

// Update GradeChart component
function GradeChart({ grades }: { grades: any }) {
  const [value, setValue] = useState(null);

  // Combine grades with the same value and sum their credits
  const combinedGrades = grades.reduce((acc: any, grade: any) => {
    const existingGrade = acc.find((g: any) => g.grade === grade.grade);

    if (existingGrade) {
      existingGrade.credits += grade.credits;
    } else {
      acc.push({ ...grade });
    }

    return acc;
  }, []);

  console.log("Filtered Data => ", combinedGrades);

  const valueFormatter = (number: number) =>
    `Credits: ${new Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <Card className="bg-transparent border-none ring-0 !shadow-none outline-none blur-none p-0 w-full flex items-start justify-center">
      <div>
        <Title className="text-indigo-700">Grade Summary (Total)</Title>
        <DonutChart
          className="mt-6 w-[380px] h-[380px] drop-shadow-none"
          data={combinedGrades}
          category="credits"
          showAnimation={true}
          variant="pie"
          index="grade"
          valueFormatter={valueFormatter}
          noDataText="Add Grades to Visualize Data"
          colors={[
            "indigo-950",
            "indigo-800",
            "indigo-700",
            "indigo-600",
            "indigo-500",
            "indigo-400",
            "indigo-300",
            "indigo-200",
          ]} // Colors in order of data list
          onValueChange={(v) => setValue(v)}
        />
      </div>
    </Card>
  );
}

export default GradeChart;
