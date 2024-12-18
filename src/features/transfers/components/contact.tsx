import Image from "next/image";
import { ContactType } from "../api/use-get-contacts";
import { cn } from "@/lib/utils";

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

export default Contact;
