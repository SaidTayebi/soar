import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface AvatarProps {
  src: string;
  size: number;
  isEditable?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Avatar = ({
  src,
  size = 60,
  isEditable = false,
  onChange,
}: AvatarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-end">
      {isEditable && (
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={onChange}
        />
      )}
      <div className={cn("rounded-full overflow-hidden")}>
        <Image
          className="object-cover"
          src={src}
          alt="profile"
          width={size}
          height={size}
        />
      </div>
      {isEditable && (
        <div
          onClick={handleAvatarClick}
          className="flex items-center justify-center p-2 rounded-full bg-black text-white right-5 relative cursor-pointer"
        >
          <Pencil className="size-4" />
        </div>
      )}
    </div>
  );
};

export default Avatar;
