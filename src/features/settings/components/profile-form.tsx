"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, RotateCcw } from "lucide-react";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import Hint from "@/components/hint";
import Avatar from "@/app/(main)/_components/avatar";
import { useEffect } from "react";

export const FormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .trim()
    .min(3, {
      message: "Name must be at least 3 characters long.",
    }),
  userName: z
    .string({
      required_error: "Username is required",
    })
    .trim()
    .min(3, {
      message: "Username must be at least 3 characters long.",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters long.",
    }),
  dateOfBirth: z.date().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  avatar: z.string().optional(),
});

type ProfileFormProps = {
  profile: any;
  isLoading: boolean;
  isSaving: boolean;
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ProfileForm = ({
  profile,
  isLoading,
  isSaving,
  onSubmit,
  onAvatarChange,
}: ProfileFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: profile?.name || "",
      userName: profile?.userName || "",
      password: profile?.password || "",
      email: profile?.email || "",
      dateOfBirth: profile?.dateOfBirth,
      presentAddress: profile?.presentAddress || "",
      permanentAddress: profile?.permanentAddress || "",
      city: profile?.city || "",
      zip: profile?.zip || "",
      country: profile?.country || "",
      avatar: profile?.avatar || "",
    },
  });

  const { isDirty } = form.formState;

  useEffect(() => {
    if (!isLoading && profile) {
      form.reset({ ...profile });
    }
  }, [profile, isLoading, form]);

  return (
    <div className="flex flex-col lg:items-start lg:flex-row items-center w-full lg:space-x-12">
      <Avatar
        src={`${profile?.avatar || "/avatars/avatar.png"}?t=${profile?.updatedAt || 0}`}
        size={90}
        isEditable
        onChange={onAvatarChange}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end w-full">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal bg-transparent",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="presentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Present Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permanentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permanent Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center space-x-2 w-full lg:w-auto lg:self-end">
            {isDirty && (
              <Hint label="Reset" side="left">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    form.reset();
                  }}
                >
                  <RotateCcw />
                </Button>
              </Hint>
            )}
            <Button
              className="w-full lg:w-auto lg:self-end"
              size="lg"
              type="submit"
              disabled={isSaving}
            >
              {isSaving && <Loader2 className="size-5 animate-spin" />}
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
