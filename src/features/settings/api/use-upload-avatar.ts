import { useMutation } from "@tanstack/react-query";

export const useUploadAvatar = () => {
  const mutation = useMutation({
    mutationFn: async (params: {
      data: FormData;
      onSuccess?: (response?: any) => void;
      onError?: (error?: any) => void;
    }) => {
      const response = await fetch("/api/upload-avatar", {
        method: "POST",
        body: params.data,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      return response.json();
    },
    onSuccess: (payload, { onSuccess }) => {
      onSuccess?.(payload);
    },
    onError: (error, { onError }) => {
      onError?.(error);
    },
  });

  return {
    uploadAvatar: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};
