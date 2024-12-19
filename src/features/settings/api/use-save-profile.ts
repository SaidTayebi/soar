import { useMutation } from "@tanstack/react-query";
import { ProfileType } from "./use-get-profile";

const mockSaveProfile = async (params: {
  data: ProfileType;
  onSuccess?: (response?: any) => void;
  onError?: (error?: any) => void;
}): Promise<{ data: ProfileType; success: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { data: params.data, success: true };
};

export const useSaveProfile = () => {
  const mutation = useMutation({
    mutationFn: mockSaveProfile,
    onSuccess: (payload, { onSuccess }) => {
      onSuccess?.(payload);
    },
    onError: (error, { onError }) => {
      onError?.(error);
    },
  });

  return {
    saveProfile: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};
