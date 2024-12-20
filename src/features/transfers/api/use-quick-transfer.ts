import { useMutation } from "@tanstack/react-query";

interface TransferData {
  contactId: string;
  amount: number;
}

const mockTransfer = async (params: {
  data: TransferData;
  onSuccess?: (response?: { data: TransferData; success: boolean }) => void;
  onError?: (error?: Error) => void;
}): Promise<{ data: TransferData; success: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { data: params.data, success: true };
};

export const useQuickTransfer = () => {
  const mutation = useMutation({
    mutationFn: mockTransfer,
    onSuccess: (payload, { onSuccess }) => {
      onSuccess?.(payload);
    },
    onError: (error, { onError }) => {
      onError?.(error);
    },
  });

  return {
    transfer: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};
