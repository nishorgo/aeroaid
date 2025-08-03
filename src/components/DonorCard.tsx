'use client';

import { getImageUrl } from '@/lib/utils/supa-utils';
import Image from 'next/image';
import { MapPin, User } from 'react-feather';
import { useRouter } from 'next/navigation';

interface DonorCardProps {
  id?: string;
  name?: string;
  bloodGroup?: string;
  area: string;
  isAvailable: boolean;
  imageUrl?: string;
  organization?: string;
  showButton?: boolean;
  onAddToList?: () => void;
}

const DonorCard = ({
  id,
  name,
  bloodGroup,
  area,
  isAvailable,
  imageUrl = '/avatar-placeholder.png',
  organization,
  showButton = false,
  onAddToList,
}: DonorCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (id) {
      router.push(`/profile/${id}`);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg">
      <div
        className="bg-gray-200 rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:bg-yellow-200 transition-shadow"
        onClick={handleCardClick}
      >
        <div className="flex justify-between items-center p-4">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <Image
                src={!imageUrl || imageUrl === '' ? '/avatar-placeholder.png' : getImageUrl('avatars', imageUrl) || '/avatar-placeholder.png'}
                alt={name?.toUpperCase() || 'Donor'}
                width={90}
                height={90}
                className="rounded-full object-cover border border-red-400"
              />
              <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${
                isAvailable ? 'bg-green-500' : 'bg-gray-400'
              }`} />
            </div>
            <div className="bg-red-100 px-2 py-1 rounded-xl">
              <span className="text-red-600 font-semibold">{bloodGroup}</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-semibold tracking-wider">{name?.toUpperCase() || 'Unknown'}</span>
            </div>
            <div className="flex items-center gap-x-4">
              <User size={18} className="text-gray-600" />
              <span className="text-gray-600 font-semibold">{organization}</span>
            </div>
            <div className="flex items-center gap-x-4">
              <MapPin size={18} className="text-green-500" />
              <span className="text-white font-semibold bg-green-500 px-3 py-1 rounded-lg">{area}</span>
            </div>
          </div>
        </div>
      <div className="bg-gray-200">
        {showButton && (
        <button
          onClick={onAddToList}
          className="w-full bg-yellow-400 text-gray-600 py-2 px-4 rounded-b-lg font-semibold tracking-widest hover:bg-yellow-500 transition-colors"
        >
          SEND REQUEST
        </button>
        )}
      </div>
      </div>

    </div>
  );
};

export default DonorCard;
