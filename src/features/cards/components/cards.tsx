"use client";

import Hint from "@/components/hint";
import { useGetCards } from "../api/use-get-cards";
import Card from "./card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Cards = () => {
  const { data, isLoading } = useGetCards();

  return (
    <div className="flex flex-col gap-4 md:w-max">
      <div className="flex justify-between">
        <span className="text-xl md:text-2xl font-semibold">My Cards</span>

        <Sheet>
          <Hint label="See All My Cards">
            <SheetTrigger asChild>
              <button className="outline-none  md:text-lg">See All</button>
            </SheetTrigger>
          </Hint>
          <SheetContent className="min-[200px] md:min-w-[420px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>All My Cards</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col items-center gap-4 p-4 mt-10">
              {data.map((card) => (
                <Card key={card.number} {...card} />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-5 md:gap-7 w-[460px] md:w-[730px] overflow-x-auto">
        {isLoading
          ? Array.from({ length: 2 }, (_, index) => (
              <Card.Skeleton key={index} />
            ))
          : data.map((card) => <Card key={card.number} {...card} />)}
      </div>
    </div>
  );
};

export default Cards;
