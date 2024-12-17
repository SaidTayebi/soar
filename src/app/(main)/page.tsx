import Activity from "@/features/activity/components/acitivity";
import Cards from "@/features/cards/components/cards";
import Transactions from "@/features/transactions/components/transactions";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-7">
        <Cards />
        <Transactions />
      </div>
      <Activity />
    </div>
  );
};

export default HomePage;
