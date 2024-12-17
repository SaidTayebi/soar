import { useQuery } from "@tanstack/react-query";

export interface Activity {
  deposit: string;
  withdrawal: string;
  date: string;
}

const fetchActivity: () => Promise<Activity[]> = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      deposit: "250",
      withdrawal: "480",
      date: "2024-12-14",
    },
    {
      deposit: "140",
      withdrawal: "350",
      date: "2024-12-15",
    },
    {
      deposit: "280",
      withdrawal: "320",
      date: "2024-12-16",
    },
    {
      deposit: "380",
      withdrawal: "480",
      date: "2024-12-17",
    },
    {
      deposit: "250",
      withdrawal: "150",
      date: "2024-12-18",
    },
    {
      deposit: "250",
      withdrawal: "400",
      date: "2024-12-19",
    },
    {
      deposit: "370",
      withdrawal: "400",
      date: "2024-12-20",
    },
  ];
};

export const useGetActivity = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["activity"],
    queryFn: fetchActivity,
  });

  return { data, isLoading };
};
