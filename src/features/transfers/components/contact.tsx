import Image from "next/image";
import { ContactType } from "../api/use-get-contacts";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ContactProps extends ContactType {}

const Contact = ({
  name,
  position,
  picture,
  isSelected = false,
}: ContactProps & { isSelected?: boolean }) => {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer">
      <div className="rounded-full">
        <Image src={picture} alt={name} width={70} height={70} />
      </div>
      <div
        className={cn(
          "flex flex-col items-center space-y-0.5",
          isSelected && "font-bold"
        )}
      >
        <span className="text-base">{name}</span>
        <span className="text-sm text-gray-400">{position}</span>
      </div>
    </div>
  );
};

Contact.displayName = "Contact";

Contact.Skeleton = function ContactSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="rounded-full w-[70px] h-[70px]" />
      <Skeleton className="w-20 h-3" />
      <Skeleton className="w-10 h-3" />
    </div>
  );
};

export default Contact;
