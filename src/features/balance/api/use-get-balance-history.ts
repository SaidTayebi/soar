import { API_WAIT_TIME } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export interface BalanceHistoryType {
  value: string;
  date: string;
}

const fetchBalanceHistory: () => Promise<BalanceHistoryType[]> = async () => {
  await new Promise((resolve) => setTimeout(resolve, API_WAIT_TIME));

  return [
    {
      value: "100",
      date: "2024-07-14",
    },
    {
      value: "220",
      date: "2024-08-16",
    },
    {
      value: "380",
      date: "2024-09-17",
    },
    {
      value: "250",
      date: "2024-10-18",
    },
    {
      value: "250",
      date: "2024-11-19",
    },
    {
      value: "500",
      date: "2024-12-20",
    },
  ];
};

export const useGetBalanceHistory = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["balance-history"],
    queryFn: fetchBalanceHistory,
  });

  return { data, isLoading };
};

export const loadingData = [
  {
    value: "250",
    date: "2024-11-19",
  },
  {
    value: "220",
    date: "2024-08-16",
  },
  {
    value: "250",
    date: "2024-10-18",
  },
  {
    value: "380",
    date: "2024-09-17",
  },
  {
    value: "500",
    date: "2024-12-20",
  },
  {
    value: "100",
    date: "2024-07-14",
  },
];
