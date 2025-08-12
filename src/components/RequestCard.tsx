import { getImageUrl } from '@/lib/utils/supa-utils';
import Image from 'next/image';
import { MapPin } from 'react-feather';

interface RequestCardProps {
  id?: number
  patient_name: string;
  hospital: string;
  location: string;
  reference: string;
  date: string;
  donor: {
    id?: string;
    full_name: string;
    contact: string;
    blood_group: string;
    area_name: string;
    avatar_url: string;
  };
};

const RequestCard = ({
  patient_name,
  hospital,
  location,
  date,
  donor,
}: RequestCardProps) => {
  return (
    <div className="overflow-hidden rounded-lg">
      <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center p-4">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <Image
                src={!donor.avatar_url || donor.avatar_url === '' ? '/avatar-placeholder.png' : getImageUrl('avatars', donor.avatar_url) || '/avatar-placeholder.png'}
                alt={donor.full_name || 'Donor'}
                width={90}
                height={90}
                className="rounded-full object-cover border border-red-400"
              />
            </div>
            <div className="bg-red-100 px-2 py-1 rounded-xl">
              <span className="text-red-600 font-semibold">{donor.blood_group}</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-semibold tracking-wider">{donor.full_name.toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center gap-x-2">
              <span className="text-gray-600 font-semibold">CONTACT:</span>
              <span className="text-neutral-200 font-semibold bg-red-500 px-2 rounded-lg">{donor.contact}</span>
            </div>
            {/* <div className="flex justify-between items-center gap-x-2">
              <span className="text-gray-600 font-semibold">LAST DONATION:</span>
              <span className="text-gray-600 font-medium">{lastDonation}</span>
            </div> */}
            <div className="flex items-center gap-x-4">
              <MapPin size={18} className="text-green-500" />
              <span className="text-white font-semibold bg-green-500 px-3 rounded-lg">{donor.area_name}</span>
            </div>
          </div>
        </div>

        <div className="bg-neutral-300 p-4">
          <div className="flex justify-between items-center gap-x-4">
            <span className="text-gray-600 font-semibold">PATIENT:</span>
            <span className="text-gray-600 font-medium">{patient_name}</span>
          </div>
          <div className="flex justify-between items-center gap-x-4">
            <span className="text-gray-600 font-semibold">HOSPITAL:</span>
            <span className="text-gray-600 font-medium">{hospital}</span>
          </div>
          <div className="flex justify-between items-center gap-x-4">
            <span className="text-gray-600 font-semibold">LOCATION:</span>
            <span className="text-gray-600 font-medium">{location}</span>
          </div>
          <div className="flex justify-between items-center gap-x-4">
            <span className="text-gray-600 font-semibold">DATE:</span>
            <span className="text-gray-600 font-medium">{date}</span>
          </div>
        </div>
{/* 
        <div className="bg-neutral-300">
          <button
            onClick={onAddToList}
            className="w-full bg-yellow-400 text-gray-600 py-2 px-4 rounded-b-lg font-semibold tracking-widest hover:bg-yellow-500 transition-colors"
          >
            CONFIRM
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default RequestCard;
