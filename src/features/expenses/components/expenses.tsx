"use client";

import { useGetExpenses } from "../api/use-get-expenses";
import { useState } from "react";
import { Pie, Sector } from "recharts";
import { ChartTooltipContent } from "@/components/ui/chart";
import { ChartConfig, ChartTooltip } from "@/components/ui/chart";
import { ChartContainer } from "@/components/ui/chart";
import { LabelList, PieChart } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

const Expenses = () => {
  const { data, isLoading } = useGetExpenses();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartConfig: ChartConfig =
    data?.reduce(
      (acc, item) => ({
        ...acc,
        [item.category]: {
          label: item.label,
          color: item.fill,
        },
      }),
      {} as Record<string, { label: string; color: string }>
    ) || {};

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="text-xl md:text-2xl font-semibold">
          Expense Statistics
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 rounded-3xl bg-transparent md:bg-white md:border border-gray-200 md:h-[322px] w-full lg:max-w-[350px] p-6">
        {isLoading ? (
          <div className="size-48 rounded-full animate-pulse bg-gray-200"></div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="w-full h-[220px] md:h-[300px] "
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="category" hideLabel />}
              />
              <Pie
                data={data}
                dataKey="value"
                activeIndex={activeIndex as number}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                  </g>
                )}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <LabelList
                  dataKey="category"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </div>
    </div>
  );
};

export default Expenses;
