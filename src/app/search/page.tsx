'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import DonorCard from '@/components/DonorCard';
import HighlightedText from '@/components/HighlightedText';
import SelectField from '@/components/SelectField';
import { areas, bloodGroups } from '@/data/dropdown';
import AreaDropdown from '@/components/AreaDropdown';
import { useGetProfileByAreaAndBloodGroup } from '@/lib/supabase/queries/profile';
import { Profile } from '@/types/database.types';
import { useAuthSession } from '@/lib/utils/auth-utils';
import { useCreateDonation } from '@/lib/supabase/queries/donations';
    
export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthSession();
  const bloodGroup = searchParams.get('bloodGroup');
  const area = searchParams.get('area');
  const [params, setParams] = useState(new URLSearchParams(searchParams.toString()));
  const { mutateAsync: createDonation } = useCreateDonation();
  const { data: donors, isLoading } = useGetProfileByAreaAndBloodGroup(
    user?.id || '',
    bloodGroup || '',
    area || undefined
  );

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(params);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // Preserve other parameters
    const currentBloodGroup = params.get('bloodGroup');
    const currentArea = params.get('area');
    
    if (key === 'bloodGroup' && currentArea) {
      newParams.set('area', currentArea);
    } else if (key === 'area' && currentBloodGroup) {
      newParams.set('bloodGroup', currentBloodGroup);
    }
    
    setParams(newParams);
    router.push(`/search?${newParams.toString()}`);
  };

  const handleAddToList = (donor: Profile) => {
    // TODO: Implement add to list functionality
    if (user?.id) {
      try {
        const res = createDonation({ donor_id: donor.id, requester_id: user?.id || '', reference: user?.user_metadata.full_name || user?.email });
        console.log("Request sent successfully:", res);
      } catch (error) {
        console.error("Error sending request:", error);
      }
    } else {
      console.error("User ID is not available");
    } 
    alert(`Sent request for ${donor.full_name} to donate blood!`);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Navbar 
        searchValue={bloodGroup || ''}
        onSearchChange={(query) => {
          const params = new URLSearchParams(searchParams);
          if (query) {
            params.set('bloodGroup', query);
          } else {
            params.delete('bloodGroup');
          }
          router.push(`/search?${params.toString()}`);
        }}
      />


      <div className="max-w-md mx-auto p-4">
        {/* Search Stats */}
        <div className="mb-6">
          <HighlightedText text={`${isLoading ? 'Loading...' : `Showing ${donors?.length || 0} donors for your search`}`} />
        </div>

      <div className='mb-6'>
        <div className='flex flex-row justify-between mb-2'>
          <SelectField
            label="Blood Group"
            value={params.get('bloodGroup') || ''}
            onChange={(e) => {
              updateSearchParams('bloodGroup', e.target.value);
            }}
            options={bloodGroups}
            required
          />

          <AreaDropdown
            value={params.get('area') || ''}
            onChange={(value) => updateSearchParams('area', value)}
            locations={areas}
          />
        </div>
      </div>

        {/* Results List */}
        <div className="space-y-3">
          {isLoading ? (
            <div>Loading...</div>
          ) : donors?.length === 0 ? (
            <div>No donors found</div>
          ) : (
            donors?.map((donor: Profile) => (
              <DonorCard
                key={donor.id}
                id={donor.id}
                name={donor.full_name || undefined}
                bloodGroup={donor.blood_group || undefined}
                area={donor.area_name}
                isAvailable={donor.is_available}
                imageUrl={donor.avatar_url || undefined}
                organization={donor.organization || undefined}
                showButton={user ? true : false}
                onAddToList={() => handleAddToList(donor)}
              />
            ))
          )}
        </div>

        {/* No Results */}
        {donors?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 tracking-wider font-semibold">No donors found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}
