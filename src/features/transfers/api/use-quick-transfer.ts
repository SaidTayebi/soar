import { useMutation } from "@tanstack/react-query";

interface TransferData {
  contactId: string;
  amount: number;
}

const mockTransfer = async (): Promise<{ success: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
};

export const useQuickTransfer = () => {
  const mutation = useMutation({
    mutationFn: mockTransfer,
  });

  return {
    transfer: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};
