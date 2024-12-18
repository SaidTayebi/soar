"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CardProps {
  holder: string;
  validThru: string;
  number: string;
  balance: string;
  currency: string;
  brand: string;
  variant?: "light" | "dark";
}

const Card = ({
  holder,
  validThru,
  number,
  balance,
  currency,
  variant = "dark",
}: CardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between bg-gray-800 rounded-3xl min-w-[350px] h-[235px] text-secondary",
        variant === "light" &&
          "bg-white text-black border border-gray-200 border-b-"
      )}
    >
      <div className="flex flex-col justify-between h-full px-7 pt-6 pb-9">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-xs">Balance</span>
            <span className="text-xl ">
              {currency}
              {balance}
            </span>
          </div>
          <Image
            src={variant === "light" ? "chip_dark.svg" : "chip_light.svg"}
            alt="credit card"
            width={35}
            height={35}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-16">
            <div className="flex flex-col">
              <span className="text-xs">CARD HOLDER</span>
              <span className="text-base">{holder}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs">VALID THRU</span>
              <span className="text-base ">{validThru}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "flex justify-between items-center h-[70px] bg-gray-600 px-7 py-4 rounded-b-3xl",
          variant === "light" && "bg-white border-t border-gray-200"
        )}
      >
        <span className="text-2xl ">{number}</span>
        <Image
          src={
            variant === "light" ? "logo_card_light.svg" : "logo_card_dark.svg"
          }
          alt="credit card"
          width={44}
          height={30}
        />
      </div>
    </div>
  );
};

Card.displayName = "Card";

Card.Skeleton = function CardSkeleton() {
  return <Skeleton className="rounded-3xl w-[350px] h-[235px]" />;
};

export default Card;
