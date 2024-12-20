"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from "sonner";

import { ContactType, useGetContacts } from "../api/use-get-contacts";
import Contact from "./contact";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { useQuickTransfer } from "../api/use-quick-transfer";
import { cn } from "@/lib/utils";
import Hint from "@/components/hint";

const Contacts = () => {
  const { data, isLoading } = useGetContacts();
  const { transfer, isLoading: isTransferLoading } = useQuickTransfer();
  const [selectedContact, setSelectedContact] = useState<ContactType>();
  const [amount, setAmount] = useState<number | null>(null);
  const [shake, setShake] = useState(false);

  const handleTransfer = () => {
    if (selectedContact && amount && amount > 0) {
      transfer({
        data: { contactId: selectedContact.id, amount },
        onSuccess: () => {
          toast.success(`$${amount} sent to ${selectedContact?.name}`);

          setSelectedContact(undefined);
          setAmount(null);
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      });
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-max">
      <div className="flex justify-between">
        <span className="text-xl md:text-2xl font-semibold">
          Quick Transfer
        </span>
      </div>
      <div className="flex flex-col items-center gap-10 rounded-3xl bg-transparent md:bg-white md:border border-gray-200 md:h-[276px] w-[445px] p-6">
        {isLoading ? (
          <div className="flex items-center gap-8 h-[140px] pt-2">
            <Contact.Skeleton />
            <Contact.Skeleton />
            <Contact.Skeleton />
          </div>
        ) : (
          <Carousel
            opts={{
              align: "center",
            }}
            className="w-[300px] max-w-sm h-[100px] md:h-[140px] pt-2"
          >
            <CarouselContent className="-ml-1">
              {data.map((contact) => (
                <CarouselItem
                  className={cn(
                    "basis-1/3 md:basis-1/2 lg:basis-1/3 pl-0",
                    shake && !selectedContact && "animate-shake"
                  )}
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                >
                  <Contact
                    {...contact}
                    isSelected={selectedContact?.id === contact.id}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="size-10 md:size-12 shadow-md" />
            <CarouselNext className="size-10 md:size-12 shadow-md" />
          </Carousel>
        )}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Write amount</span>
          <div className="flex items-center gap-2 relative left-11">
            <Input
              className={`bg-gray-100 rounded-full h-10 md:h-12 pl-6 w-[180px] ${
                shake && !amount && "animate-shake border-red-500"
              }`}
              placeholder="$525.50"
              value={amount ?? ""}
              disabled={isTransferLoading || isLoading}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Hint label="Quick Transfer">
              <Button
                className="relative rounded-full h-[40px] md:h-[50px] px-6 z-10 -left-11"
                disabled={isTransferLoading || isLoading}
                onClick={handleTransfer}
              >
                Send
                {isTransferLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <Send />
                )}
              </Button>
            </Hint>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
