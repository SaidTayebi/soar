import { cn } from "@/lib/utils";
import { TransactionType } from "../api/use-get-transactions";
import Image from "next/image";
import { format } from "date-fns";
const Transaction = ({
  id,
  label,
  date,
  amount,
  currency,
  type,
  icon,
  bgColor,
}: TransactionType) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded-full w-12 h-12"
          style={{ backgroundColor: bgColor }}
        >
          <Image src={icon} alt="transaction_icon" width={28} height={28} />
        </div>
        <div className="flex flex-col">
          <span>{label}</span>
          <span className="text-sm text-muted-foreground">
            {format(new Date(date), "dd MMMM yyyy")}
          </span>
        </div>
      </div>
      <div
        className={cn(
          "flex",
          type === "deposit" ? "text-green-500" : "text-red-500"
        )}
      >
        <span>{type === "deposit" ? "+" : "-"}</span>
        <span>{currency}</span>
        <span>{amount}</span>
      </div>
    </div>
  );
};

export default Transaction;
