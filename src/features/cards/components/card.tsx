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
        "flex flex-col justify-between bg-gray-800 rounded-3xl max-w-[265px] min-w-[265px] h-[170px] md:min-w-[350px] md:h-[235px] text-secondary",
        variant === "light" && "bg-white text-black border border-gray-200"
      )}
    >
      <div className="flex flex-col justify-between h-full px-5 md:px-7 pt-4 md:pt-6 pb-4 md:pb-9">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-2xs md:text-xs">Balance</span>
            <span className="text-base md:text-xl">
              {currency}
              {balance}
            </span>
          </div>
          <Image
            className="hidden md:block"
            src={variant === "light" ? "chip_dark.svg" : "chip_light.svg"}
            alt="credit card"
            width={35}
            height={35}
          />
          <Image
            className="md:hidden"
            src={variant === "light" ? "chip_dark.svg" : "chip_light.svg"}
            alt="credit card"
            width={29}
            height={29}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-16">
            <div className="flex flex-col">
              <span className="text-2xs md:text-xs">CARD HOLDER</span>
              <span className="text-sm md:text-base">{holder}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xs md:text-xs">VALID THRU</span>
              <span className="text-sm md:text-base">{validThru}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "flex justify-between items-center h-[51px] md:h-[70px] bg-gray-600 px-7 py-4 rounded-b-3xl",
          variant === "light" && "bg-white border-t border-gray-200"
        )}
      >
        <span className="text-sm md:text-2xl ">{number}</span>
        <Image
          className="hidden md:block"
          src={
            variant === "light" ? "logo_card_light.svg" : "logo_card_dark.svg"
          }
          alt="credit card"
          width={44}
          height={30}
        />
        <Image
          className="md:hidden"
          src={
            variant === "light" ? "logo_card_light.svg" : "logo_card_dark.svg"
          }
          alt="credit card"
          width={27}
          height={18}
        />
      </div>
    </div>
  );
};

Card.displayName = "Card";

Card.Skeleton = function CardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-3xl w-[265px] h-[170px] md:w-[350px] md:h-[235px] bg-gray-200 animate-pulse">
      <div className="flex justify-end pt-8 pr-8">
        <Image
          className="hidden md:block opacity-50"
          src="chip_dark.svg"
          alt="credit card"
          width={35}
          height={35}
        />
        <Image
          className="md:hidden opacity-50"
          src="chip_dark.svg"
          alt="credit card"
          width={29}
          height={29}
        />
      </div>
      <div className="h-1/4 bg-gray-300 rounded-b-3xl"></div>
    </div>
  );
};

export default Card;
