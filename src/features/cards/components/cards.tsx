"use client";

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
    <div className="flex flex-col gap-4 w-max">
      <div className="flex justify-between">
        <span className="text-2xl font-semibold">My Cards</span>

        <Sheet>
          <SheetTrigger asChild>
            <button className="outline-none text-lg">See All</button>
          </SheetTrigger>
          <SheetContent className="min-w-[420px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>All My Cards</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-4 p-4 mt-10">
              {data.map((card) => (
                <Card key={card.number} {...card} />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-7 w-[730px] overflow-x-auto">
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
