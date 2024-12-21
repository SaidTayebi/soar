import dynamic from "next/dynamic";
import Cards from "@/features/cards/components/cards";
import Transactions from "@/features/transactions/components/transactions";

const Activity = dynamic(
  () => import("@/features/activity/components/acitivity")
);
const Expenses = dynamic(
  () => import("@/features/expenses/components/expenses")
);
const Contacts = dynamic(
  () => import("@/features/transfers/components/contacts")
);
const Balance = dynamic(() => import("@/features/balance/components/balance"));

const HomePage = () => {
  return (
    <div className="flex flex-col items-start justify-center md:items-center gap-8 w-ful">
      <div className="flex items-center flex-wrap lg:flex-nowrap w-full gap-7">
        <Cards />
        <Transactions />
      </div>
      <div className="flex items-center flex-wrap lg:flex-nowrap w-full gap-7">
        <Activity />
        <Expenses />
      </div>

      <div className="flex items-center flex-wrap lg:flex-nowrap w-full gap-7">
        <Contacts />
        <Balance />
      </div>
    </div>
  );
};

export default HomePage;
