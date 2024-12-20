import { atom, useAtom } from "jotai";
import { ProfileType, useGetProfile } from "../api/use-get-profile";
import { useEffect } from "react";

const profileState = atom<ProfileType>({
  name: "",
  userName: "",
  password: "",
  dateOfBirth: undefined,
  email: "",
  avatar: "",
  presentAddress: "",
  permanentAddress: "",
  city: "",
  zip: "",
  country: "",
  updatedAt: 0,
});

export const useProfileState = () => {
  const [profile, setProfile] = useAtom<ProfileType>(profileState);
  const { data, isLoading } = useGetProfile();

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data, setProfile]);

  return { profile, isLoading, setProfile };
};
