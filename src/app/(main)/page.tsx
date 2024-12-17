import Cards from "@/features/cards/components/cards";
import Transactions from "@/features/transactions/components/transactions";

const HomePage = () => {
  return (
    <div className="flex gap-7">
      <Cards />
      <Transactions />
    </div>
  );
};

export default HomePage;
