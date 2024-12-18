"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetBalanceHistory } from "../api/use-get-balance-history";
import { format } from "date-fns";
import colors from "tailwindcss/colors";

const chartConfig = {
  value: {
    label: "Balance",
    color: colors.blue[500],
  },
} satisfies ChartConfig;

const Balance = () => {
  const { data: balanceHistory } = useGetBalanceHistory();

  return (
    <div className="flex flex-col gap-4 w-max">
      <div className="flex justify-between">
        <span className="text-2xl font-semibold">Balance History</span>
      </div>
      <div className="flex flex-col gap-5 rounded-3xl bg-white border border-gray-200 h-[276px] w-[635px] p-6 pl-0">
        <div>
          <ChartContainer className="max-h-[250px] w-full" config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={balanceHistory}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid strokeDasharray="4" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => format(new Date(value), "MMM")}
              />
              <YAxis tickMargin={10} axisLine={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <defs>
                <linearGradient id="fillArea" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={colors.blue[500]}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors.blue[500]}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="value"
                type="natural"
                fill="url(#fillArea)"
                fillOpacity={0.4}
                stroke="var(--color-value)"
                strokeWidth={3}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default Balance;