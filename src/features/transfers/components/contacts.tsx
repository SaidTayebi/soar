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
import { useEffect, useState } from "react";
import { useQuickTransfer } from "../api/use-quick-transfer";
import { cn } from "@/lib/utils";

const Contacts = () => {
  const { data, isLoading } = useGetContacts();
  const {
    transfer,
    isLoading: isTransferLoading,
    isSuccess,
  } = useQuickTransfer();
  const [selectedContact, setSelectedContact] = useState<ContactType>();
  const [amount, setAmount] = useState<number | null>(null);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (isSuccess && !isTransferLoading) {
      toast.success(`$${amount} sent to ${selectedContact?.name}`);

      setSelectedContact(undefined);
      setAmount(null);
    }
  }, [isSuccess, isTransferLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleTransfer = () => {
    if (selectedContact && amount && amount > 0) {
      transfer({ contactId: selectedContact.id, amount });
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-max">
      <div className="flex justify-between">
        <span className="text-2xl font-semibold">Quick Transfer</span>
      </div>
      <div className="flex flex-col items-center gap-5 rounded-3xl bg-white border border-gray-200 h-[276px] w-[445px] p-6">
        <Carousel
          opts={{
            align: "center",
          }}
          className="w-[300px] max-w-sm"
        >
          <CarouselContent className="-ml-1">
            {data.map((contact) => (
              <CarouselItem
                className={cn(
                  "md:basis-1/2 lg:basis-1/3 pl-0",
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
          <CarouselPrevious className="size-12" />
          <CarouselNext className="size-12" />
        </Carousel>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Write amount</span>
          <div className="flex items-center gap-2 relative left-11">
            <Input
              className={`bg-gray-100 rounded-full h-12 pl-6 w-[180px] ${
                shake && !amount && "animate-shake border-red-500"
              }`}
              placeholder="525.50"
              value={amount ?? ""}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Button
              className="relative rounded-full h-[50px] px-6 z-10 -left-11"
              disabled={isTransferLoading}
              onClick={handleTransfer}
            >
              Send
              {isTransferLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Send />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;