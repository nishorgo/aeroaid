"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/InputField";
import HighlightedText from "@/components/HighlightedText";
import Navbar from "@/components/Navbar";
import ImageUpload from "@/components/ImageUpload";
import { areas } from "@/data/dropdown";
import AreaDropdown from "@/components/AreaDropdown";
import { useAuthSession } from "@/lib/utils/auth-utils";
import {
  useGetProfile,
  useUpdateProfile,
  useUploadAvatar
} from "@/lib/supabase/queries/profile";

export default function Profile() {
  const [formData, setFormData] = useState({
    organization: "",
    area_name: "",
    contact: "",
    bio: "",
    is_available: true,
    avatar_url: "",
  });
  const { user, profile: profileData } = useAuthSession();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const [avatar, setAvatar] = useState<File | null>(null);
  const { mutateAsync: uploadAvatar } = useUploadAvatar();

  useEffect(() => {
    if (profileData) {
      setFormData({
        organization: profileData.organization || "",
        area_name: profileData.area_name || "",
        contact: profileData.contact || "",
        bio: profileData.bio || "",
        avatar_url: profileData.avatar_url || "",
        is_available: profileData.is_available ?? true,
      });
      console.log(profileData);
    }
  }, [profileData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.id) {
      try {
        const updatedProfile = { ...formData };
        
        if (avatar) {
          const avatarPath = await uploadAvatar({ userId: user.id, file: avatar });
          updatedProfile.avatar_url = avatarPath;
        }

        const res = await updateProfile({
          userId: user.id,
          profile: updatedProfile
        });
        console.log("Profile updated successfully:", res);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      console.error("User ID is not available");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Profile Content */}
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-7">
          <div className="flex-1">
            <HighlightedText text="PUBLIC PROFILE" textAlign="left" />
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-400 text-white tracking-widest rounded-lg hover:bg-green-500 transition-colors font-semibold"
          >
            SUBMIT
          </button>
        </div>

        <form className="space-y-4">
          {/* Profile Image and Name Section */}
          <div className="flex items-center space-x-4">
            <ImageUpload
              onImageChange={(file) => setAvatar(file)}
              currentImage={profileData?.avatar_url}
            />
            <div className="flex-1">
              <div className="space-y-1">
                <p className="block text-md font-semibold tracking-widest uppercase text-gray-600">
                  NAME
                </p>
                <p className="w-full h-10 px-3 rounded bg-gray-100 text-gray-400 flex items-center">
                  {profileData?.full_name || "Your Name"}
                </p>
              </div>

              <div className="mt-2">
                <div className="space-y-1">
                  <p className="block text-md font-semibold tracking-widest uppercase text-gray-600">
                    BLOOD GROUP
                  </p>
                  <p className="w-full h-10 px-3 rounded bg-gray-100 text-gray-400 flex items-center">
                    {profileData?.blood_group || "Your Blood Group"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Organization */}
          <InputField
            label="Organization / Institute"
            type="text"
            placeholder="AIB"
            value={formData.organization}
            onChange={(e) =>
              setFormData({ ...formData, organization: e.target.value })
            }
            required
          />

          {/* Area */}
          <div>
            <AreaDropdown
              value={formData.area_name}
              onChange={(value) =>
                setFormData({ ...formData, area_name: value })
              }
              locations={areas}
              required
            />
          </div>

          {/* Contact */}
          <div>
            <InputField
              label="Contact"
              type="tel"
              value={formData.contact}
              placeholder="01728145233"
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-md font-semibold tracking-widest uppercase text-gray-600 mb-1">
              BIO
            </label>
            <textarea
              placeholder="Hey! I'm an aviation student studying B2 part-66 course. I am a frequent blood donor."
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full h-24 px-3 py-2 rounded bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {/* Availability Toggle */}
          <div className="space-y-2">
            <HighlightedText
              text="Available for blood donation?"
              bgColor="bg-yellow-400"
              fontColor="text-gray-700"
            />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    is_available: !formData.is_available,
                  })
                }
                className="w-16 h-7 rounded-full relative bg-gray-300 transition-colors"
              >
                <div
                  className={`absolute w-9 h-9 rounded-full -top-1 shadow-md transition-all ${
                    formData.is_available
                      ? "translate-x-8 bg-green-500"
                      : "translate-x-0 bg-slate-700"
                  }`}
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
