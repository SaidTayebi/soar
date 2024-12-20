import { API_WAIT_TIME } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface Card {
  holder: string;
  validThru: string;
  number: string;
  balance: string;
  currency: string;
  brand: string;
  variant?: "light" | "dark";
}

const fetchCards: () => Promise<Card[]> = async () => {
  await new Promise((resolve) => setTimeout(resolve, API_WAIT_TIME));

  return [
    {
      holder: "Eddy Cusuma",
      validThru: "12/24",
      number: "1234 **** **** 3456",
      balance: "6,800",
      currency: "€",
      brand: "Visa",
      variant: "dark",
    },
    {
      holder: "Eddy Cusuma",
      validThru: "12/25",
      number: "1234 **** **** 3457",
      balance: "5,756",
      currency: "$",
      brand: "Mastercard",
      variant: "light",
    },
    {
      holder: "Eddy Cusuma",
      validThru: "12/26",
      number: "1234 **** **** 3458",
      balance: "6,800",
      currency: "€",
      brand: "Visa",
      variant: "dark",
    },
    {
      holder: "Eddy Cusuma",
      validThru: "12/27",
      number: "1234 **** **** 3459",
      balance: "6,800",
      currency: "€",
      brand: "Visa",
      variant: "light",
    },
  ];
};

export const useGetCards = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });

  return { data, isLoading };
};
