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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4 w-max">
      <div className="flex justify-between">
        <span className="text-2xl font-semibold">Weekly Activity</span>
      </div>
      <div className="flex flex-col gap-5 rounded-3xl bg-white border border-gray-200 h-[322px] w-[730px] p-6">
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

        <div>
          <ChartContainer className="max-h-[250px] w-full" config={chartConfig}>
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
      </div>
    </div>
  );
};

export default Activity;
