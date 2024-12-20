"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import colors from "tailwindcss/colors";
import { useGetActivity } from "../api/use-get-activity";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const Activity = () => {
  const { data, isLoading } = useGetActivity();

  const chartConfig = {
    deposit: {
      label: "Deposit",
      color: colors.blue[500],
    },
    withdrawal: {
      label: "Withdrawal",
      color: colors.black,
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col gap-4 w-max">
      <div className="flex justify-between">
        <span className="text-xl md:text-2xl font-semibold">
          Weekly Activity
        </span>
      </div>
      <div className="flex flex-col justify-between gap-5 rounded-3xl bg-transparent md:bg-white md:border border-gray-200 h-[322px] w-[calc(100vw-theme(spacing.12))] md:w-[730px] p-6 pl-0">
        <div className="flex items-center self-end gap-6">
          <div className="flex items-center gap-2">
            <div className="rounded-full w-[15px] h-[15px] bg-black"></div>
            <span className="text-sm">Withdraw</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full w-[15px] h-[15px] bg-blue-500"></div>
            <span className="text-sm">Deposit</span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center pb-4 pl-6">
            <Activity.Skeleton />
          </div>
        ) : (
          <div>
            <ChartContainer className="h-[250px] w-full" config={chartConfig}>
              <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => format(new Date(value), "iii")}
                />
                <YAxis
                  tickLine={false}
                  tickCount={6}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value, i) => `${i * 100}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar
                  dataKey="withdrawal"
                  fill="var(--color-withdrawal)"
                  radius={50}
                  barSize={15}
                  style={{
                    transform: "translateX(-2px)",
                  }}
                />
                <Bar
                  dataKey="deposit"
                  fill="var(--color-deposit)"
                  radius={50}
                  barSize={15}
                  style={{
                    transform: "translateX(2px)",
                  }}
                />
              </BarChart>
            </ChartContainer>
          </div>
        )}
      </div>
    </div>
  );
};

Activity.displayName = "Activity";

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex justify-center space-x-10">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          className={cn("flex items-end gap-3", index > 4 && "hidden md:flex")}
          key={index}
        >
          <Skeleton className="h-48 w-4 rounded-full" />
          <Skeleton className="h-28 w-4 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default Activity;
