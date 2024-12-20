import { useQuery } from "@tanstack/react-query";

export interface ProfileType {
  name: string;
  userName: string;
  password: string;
  dateOfBirth?: Date;
  email: string;
  avatar?: string;
  presentAddress?: string;
  permanentAddress?: string;
  city?: string;
  zip?: string;
  country?: string;
  updatedAt?: number;
}

const fetchProfile: () => Promise<ProfileType> = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    name: "Jane Doe",
    userName: "jane.doe",
    password: "password",
    dateOfBirth: new Date("2021-01-28"),
    email: "jane.doe@example.com",
    avatar: "/avatars/user.png",
    presentAddress: "123 Main St, Anytown, USA",
    permanentAddress: "456 Main St, Anytown, USA",
    city: "Anytown",
    zip: "12345",
    country: "USA",
    updatedAt: Date.now(),
  };
};

export const useGetProfile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  return { data, isLoading };
};
