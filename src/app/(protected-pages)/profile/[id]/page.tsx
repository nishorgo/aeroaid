'use client';

import { use } from 'react';
import HighlightedText from '@/components/HighlightedText';
import Navbar from '@/components/Navbar';
import { useGetProfile } from '@/lib/supabase/queries/profile';
import { getImageUrl } from '@/lib/utils/supa-utils';
import Image from 'next/image';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { id } = use(params);
  const { data: profileData, isLoading } = useGetProfile(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600 font-semibold tracking-widest">PROFILE NOT FOUND</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Profile Content */}
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="mb-12">
          <HighlightedText text="DONOR PROFILE" textAlign="left" />
        </div>

        <div className="space-y-4">
          {/* Profile Image and Name Section */}
          <div className="flex items-center space-x-4">
            <div className="relative w-32 h-32">
              <Image
                src={!profileData.avatar_url || profileData.avatar_url === '' ? '/avatar-placeholder.png' : getImageUrl('avatars', profileData.avatar_url) || '/avatar-placeholder.png'}
                alt={profileData.full_name || 'Donor'}
                fill
                className="rounded-full object-cover border-2 border-gray-200"
              />
              <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${
                profileData.is_available ? 'bg-green-500' : 'bg-gray-400'
              }`} />
            </div>
            <div className="flex-1">
              <div className="space-y-1">
                <p className="block text-md font-semibold tracking-widest uppercase text-gray-600">
                  NAME
                </p>
                <p className="w-full h-10 px-3 rounded bg-gray-100 text-gray-700 flex items-center">
                  {profileData.full_name}
                </p>
              </div>

              <div className="mt-2">
                <div className="space-y-1">
                  <p className="block text-md font-semibold tracking-widest uppercase text-gray-600">
                    BLOOD GROUP
                  </p>
                  <p className="w-full h-10 px-3 rounded bg-gray-100 text-gray-700 flex items-center">
                    {profileData.blood_group}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="space-y-1">
            <p className="block text-md font-semibold tracking-widest uppercase text-gray-600">
              ORGANIZATION / INSTITUTE
            </p>
            <p className="w-full h-10 px-3 rounded bg-gray-100 text-gray-700 flex items-center">
              {profileData.organization}
            </p>
          </div>

          {/* Area */}
          <div className="space-y-1">
            <p className="block text-md font-semibold tracking-widest uppercase text-gray-600">
              AREA
            </p>
            <p className="w-full h-10 px-3 rounded bg-gray-100 text-gray-700 flex items-center">
              {profileData.area_name}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-1">
            <p className="block text-md font-semibold tracking-widest uppercase text-gray-600">
              CONTACT
            </p>
            <p className="w-full h-10 px-3 rounded bg-gray-100 text-gray-700 flex items-center">
              {profileData.contact}
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-1">
            <p className="block text-md font-semibold tracking-widest uppercase text-gray-600">
              BIO
            </p>
            <p className="w-full min-h-[6rem] px-3 py-2 rounded bg-gray-100 text-gray-700">
              {profileData.bio}
            </p>
          </div>

          {/* Availability Status */}
          <div className="space-y-2">
            <HighlightedText
              text={profileData.is_available ? "AVAILABLE FOR DONATION" : "NOT AVAILABLE FOR DONATION"}
              bgColor={profileData.is_available ? "bg-green-400" : "bg-gray-400"}
              fontColor="text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}