"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useProfileState } from "@/features/settings/store/profile-store";
import Avatar from "../_components/avatar";
import { useUploadAvatar } from "@/features/settings/api/use-upload-avatar";
import { useSaveProfile } from "@/features/settings/api/use-save-profile";
import { CalendarIcon, Loader2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import Hint from "@/components/hint";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
const tabs = [
  { id: "profile", label: "Edit Profile" },
  { id: "preferences", label: "Preferences" },
  { id: "security", label: "Security" },
];

const FormSchema = z.object({
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

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const { profile, isLoading, setProfile } = useProfileState();
  const { uploadAvatar } = useUploadAvatar();

  const {
    saveProfile,
    isLoading: isSaving,
    isSuccess: isSaveSuccess,
  } = useSaveProfile();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      userName: "",
      password: "",
      email: "",
      dateOfBirth: undefined,
      presentAddress: "",
      permanentAddress: "",
      city: "",
      zip: "",
      country: "",
      avatar: "",
    },
  });

  const { isDirty } = form.formState;

  useEffect(() => {
    if (!isLoading && profile) {
      form.reset({ ...profile });
    }
  }, [profile, isLoading, form]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    saveProfile({
      data,
      onSuccess: () => {
        setProfile(data);
        toast.success("Profile updated");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    uploadAvatar({
      data: formData,
      onSuccess: (payload) => {
        const { avatarPath } = payload;

        setProfile({
          ...profile,
          avatar: avatarPath,
          updatedAt: Date.now(),
        });
      },
      onError: (error) => {
        console.error("Error uploading avatar:", error);
      },
    });
  };

  return (
    <div className="rounded-3xl bg-white w-full h-full p-9">
      <div className="flex items-center space-x-10 md:space-x-20 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            className={`pb-3 relative transition-colors duration-300 ease-in-out
              ${activeTab === tab.id ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}
            `}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <div
              className={cn(
                "absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-all duration-300 ease-in-out",
                activeTab === tab.id
                  ? "scale-x-100 opacity-100"
                  : "scale-x-0 opacity-0"
              )}
            />
          </button>
        ))}
      </div>

      <div className="lg:px-10 py-14">
        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              className="flex flex-col lg:items-start lg:flex-row items-center w-full lg:space-x-12"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar
                src={`${profile?.avatar || "/avatars/avatar.png"}?t=${profile?.updatedAt || 0}`}
                size={90}
                isEditable
                onChange={handleFileChange}
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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date: Date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
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
            </motion.div>
          )}
          {activeTab === "preferences" && (
            <motion.div
              key="preferences"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>Preferences</div>
            </motion.div>
          )}
          {activeTab === "security" && (
            <motion.div
              key="security"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>Security</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SettingsPage;
