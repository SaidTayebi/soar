import { useQuery } from "@tanstack/react-query";
import colors from "tailwindcss/colors";

export interface ExpenseType {
  id: string;
  category: string;
  label: string;
  value: number;
  fill: string;
}

const fetchExpenses: () => Promise<ExpenseType[]> = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: "1",
      category: "entertainment",
      label: "Entertainment",
      value: 30,
      fill: "#343C6A",
    },
    {
      id: "2",
      category: "bill_expense",
      label: "Bill Expense",
      value: 15,
      fill: "#FC7900",
    },
    {
      id: "3",
      category: "others",
      label: "Others",
      value: 35,
      fill: "#232323",
    },
    {
      id: "4",
      category: "investment",
      label: "Investment",
      value: 20,
      fill: "#396AFF",
    },
  ];
};

export const useGetExpenses = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  return { data, isLoading };
};
