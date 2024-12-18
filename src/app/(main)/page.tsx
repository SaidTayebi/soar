import Activity from "@/features/activity/components/acitivity";
import Balance from "@/features/balance/components/balance";
import Cards from "@/features/cards/components/cards";
import Expenses from "@/features/expenses/components/expenses";
import Transactions from "@/features/transactions/components/transactions";
import Contacts from "@/features/transfers/components/contacts";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-7">
        <Cards />
        <Transactions />
      </div>
      <div className="flex gap-7">
        <Activity />
        <Expenses />
      </div>
      <div className="flex gap-7">
        <Contacts />
        <Balance />
      </div>
    </div>
  );
};

export default HomePage;
