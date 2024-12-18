"use client";

import { useGetTransactions } from "../api/use-get-transactions";
import Transaction from "./transaction";

const Transactions = () => {
  const { data, isLoading } = useGetTransactions();

  return (
    <div className="flex flex-col gap-4 w-max">
      <div className="flex justify-between">
        <span className="text-2xl font-semibold">Recent Transactions</span>
      </div>
      <div className="flex flex-col gap-5 rounded-3xl bg-white border border-gray-200 h-[235px] w-[350px] p-6 overflow-y-auto">
        {data.map((transaction) => (
          <Transaction key={transaction.id} {...transaction} />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
