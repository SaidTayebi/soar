import Activity from "@/features/activity/components/acitivity";
import Balance from "@/features/balance/components/balance";
import Cards from "@/features/cards/components/cards";
import Expenses from "@/features/expenses/components/expenses";
import Transactions from "@/features/transactions/components/transactions";
import Contacts from "@/features/transfers/components/contacts";

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
