import { useQuery } from "@tanstack/react-query";

export interface ContactType {
  id: string;
  name: string;
  position: string;
  picture: string;
}

const fetchContacts: () => Promise<ContactType[]> = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: "1",
      name: "Livia Bator",
      position: "CEO",
      picture: "avatars/livia_bator.svg",
    },
    {
      id: "2",
      name: "Randy Press",
      position: "Director",
      picture: "avatars/randy_press.svg",
    },
    {
      id: "3",
      name: "Workman",
      position: "Designer",
      picture: "avatars/workman_1.svg",
    },
    {
      id: "4",
      name: "Workman",
      position: "Designer",
      picture: "avatars/workman_2.svg",
    },
    {
      id: "5",
      name: "Workman",
      position: "Designer",
      picture: "avatars/workman_3.svg",
    },
  ];
};

export const useGetContacts = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  return { data, isLoading };
};
