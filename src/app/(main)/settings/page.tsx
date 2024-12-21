"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { z } from "zod";
import dynamic from "next/dynamic";

import { useProfileState } from "@/features/settings/store/profile-store";
import { useUploadAvatar } from "@/features/settings/api/use-upload-avatar";
import { useSaveProfile } from "@/features/settings/api/use-save-profile";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { FormSchema } from "@/features/settings/components/profile-form";

const ProfileForm = dynamic(
  () =>
    import("@/features/settings/components/profile-form").then((mod) => ({
      default: mod.ProfileForm,
    })),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

const tabs = [
  { id: "profile", label: "Edit Profile" },
  { id: "preferences", label: "Preferences" },
  { id: "security", label: "Security" },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const { profile, isLoading, setProfile } = useProfileState();
  const { uploadAvatar } = useUploadAvatar();

  const { saveProfile, isLoading: isSaving } = useSaveProfile();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    saveProfile({
      data,
      onSuccess: () => {
        setProfile(data);
        toast.success("Profile updated");
      },
      onError: (error) => {
        toast.error(error?.message);
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
        const { avatarPath } = payload || {};

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
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileForm
                profile={profile}
                isLoading={isLoading}
                isSaving={isSaving}
                onSubmit={onSubmit}
                onAvatarChange={handleFileChange}
              />
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
