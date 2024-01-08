"use client";

import { Card, DonutChart, Title } from "@tremor/react";
import { useState } from "react";

type GradeChartProps = {
  grades: any;
  size: "sm" | "lg";
};

function GradeChart({ grades, size }: GradeChartProps) {
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

  const totalCredits = combinedGrades.reduce(
    (total: number, grade: any) => total + grade.credits,
    0
  );

  const valueFormatter = (number: number) =>
    `Credits: ${new Intl.NumberFormat("us").format(number).toString()}`;

  const customTooltip = ({
    payload,
    active,
  }: {
    payload: any;
    active: any;
  }) => {
    if (!active || !payload) return null;
    const categoryPayload = payload?.[0];
    if (!categoryPayload) return null;
    return (
      <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
        <div className="flex flex-1 space-x-2.5">
          <div
            className={`w-1.5 flex flex-col bg-${categoryPayload?.color}-500 rounded`}
          />
          <div className="w-full">
            <div className="flex items-center justify-between space-x-8">
              <p className="text-right text-tremor-content whitespace-nowrap">
                Grade: {categoryPayload.name}
              </p>
              <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
                Credits: {categoryPayload.value}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-transparent border-none ring-0 !shadow-none outline-none blur-none p-0 w-full flex items-start justify-center">
      <div>
        <Title className="text-indigo-700 dark:text-indigo-50 text-center">
          Grade Summary
        </Title>
        <DonutChart
          className={`mt-6 drop-shadow-none rounded-full p-1.5 fade-border ${
            size === "lg" && "w-[380px] h-[380px]"
          } ${size === "sm" && "w-[300px] h-[300px]"}`}
          data={combinedGrades}
          category="credits"
          showAnimation={true}
          animationDuration={500}
          variant="pie"
          index="grade"
          valueFormatter={valueFormatter}
          customTooltip={customTooltip}
          noDataText="Add Grades to Visualize Data"
          onValueChange={(v) => setValue(v)}
        />
        <p
          className={`text-center mt-5 mb-12 text-neutral-500 dark:text-neutral-400 font-semibold`}
        >
          Total Credits: {new Intl.NumberFormat("us").format(totalCredits)}
        </p>
      </div>
    </Card>
  );
}

export default GradeChart;
