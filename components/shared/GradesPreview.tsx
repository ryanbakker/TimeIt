"use client";

import { Card, DonutChart, Title } from "@tremor/react";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Award } from "lucide-react";

function GradesPreview() {
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
    <div className="wrapper">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-4">
          <div className="w-fit">
            <h2 className="font-semibold text-2xl text-indigo-900 dark:text-indigo-50 ">
              Grades
            </h2>
            <div className="h-[2.5px] w-full bg-indigo-800 dark:bg-indigo-50 rounded-full" />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-lg flex flex-row items-center gap-5">
              <span className="bg-blue-200 text-blue-700 py-0 px-1.5 rounded-md">
                A-
              </span>{" "}
              Credits:{" "}
              <span className="bg-neutral-200 text-neutral-700 py-0 px-1.5 rounded-md">
                30
              </span>
            </p>
            <p className="text-lg flex flex-row items-center gap-5">
              <span className="bg-green-200 text-green-700 py-0 px-1.5 rounded-md">
                B-
              </span>{" "}
              Credits:{" "}
              <span className="bg-neutral-200 text-neutral-700 py-0 px-1.5 rounded-md">
                30
              </span>
            </p>
          </div>
        </div>

        <div>
          <Card className="bg-transparent border-none ring-0 !shadow-none outline-none blur-none p-0">
            <DonutChart
              className="mt-6 w-[350px] h-[350px] drop-shadow-none"
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
          </Card>
        </div>
      </div>

      <Button size="lg" asChild>
        <Link href="/grades" className="flex flex-row items-center gap-2">
          <Award size={18} /> Go to Notes
        </Link>
      </Button>
    </div>
  );
}

export default GradesPreview;
