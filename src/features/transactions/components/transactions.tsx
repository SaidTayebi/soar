"use client";

import { useGetTransactions } from "../api/use-get-transactions";
import Transaction from "./transaction";

const Transactions = () => {
  const { data, isLoading } = useGetTransactions();

  return (
    <div className="flex flex-col gap-4 w-full min-w-[200px]">
      <div className="flex justify-between">
        <span className="text-xl md:text-2xl font-semibold">
          Recent Transactions
        </span>
      </div>
      <div className="flex flex-col gap-5 rounded-3xl bg-transparent md:bg-white md:border border-gray-200 h-[235px] w-full p-6 overflow-y-auto">
        {isLoading ? (
          <>
            <Transaction.Skeleton />
            <Transaction.Skeleton />
            <Transaction.Skeleton />
          </>
        ) : (
          data.map((transaction) => (
            <Transaction key={transaction.id} {...transaction} />
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;
