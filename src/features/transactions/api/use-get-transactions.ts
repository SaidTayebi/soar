import { useQuery } from "@tanstack/react-query";

export interface TransactionType {
  id: string;
  label: string;
  date: string;
  amount: string;
  currency: string;
  type: "deposit" | "withdrawal";
  icon: string;
  bgColor: string;
}

const fetchTransactions: () => Promise<TransactionType[]> = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: "1",
      label: "Deposit from my card",
      date: "2021-01-28",
      amount: "850",
      type: "withdrawal",
      currency: "$",
      icon: "transaction_1.svg",
      bgColor: "#FFF5D9",
    },
    {
      id: "2",
      label: "Deposit Paypal",
      date: "2021-01-25",
      amount: "2,500",
      type: "deposit",
      currency: "$",
      icon: "transaction_2.svg",
      bgColor: "#E7EDFF",
    },
    {
      id: "3",
      label: "Jemi Wilson",
      date: "2021-01-21",
      amount: "5,400",
      type: "deposit",
      currency: "€",
      icon: "transaction_3.svg",
      bgColor: "#DCFAF8",
    },
    {
      id: "4",
      label: "Jemi Wilson",
      date: "2021-01-21",
      amount: "5,400",
      type: "deposit",
      currency: "€",
      icon: "transaction_1.svg",
      bgColor: "#DCFAF8",
    },
  ];
};

export const useGetTransactions = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  return { data, isLoading };
};
