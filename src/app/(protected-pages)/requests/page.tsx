'use client';

import Navbar from '@/components/Navbar';
import HighlightedText from '@/components/HighlightedText';
import RequestCard from '@/components/RequestCard';
import { useAuthStore } from '@/lib/stores/use-auth-store';
import { useGetSentDonations } from '@/lib/supabase/queries/donations';
import LoadingSpinner from '@/components/LoadingSpinner';

type DonationRequest = {
  id: number;
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

export default function SentRequestsPage() {
  const { profile } = useAuthStore();
  const { data: sentRequests, isLoading, error } = useGetSentDonations(profile?.id || '');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-md mx-auto p-4">
        <HighlightedText text="SENT REQUESTS" className="mb-4" />
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center text-red-600 font-semibold tracking-widest">ERROR LOADING REQUEST DATA</div>
          ) : sentRequests && sentRequests.length > 0 ? (
            sentRequests.map((request: DonationRequest, index: number) => (
              <RequestCard 
                key={index}
                patient_name={request.patient_name}
                hospital={request.hospital}
                location={request.location}
                reference={request.reference}
                date={request.date}
                donor={request.donor}
              />
            ))
          ) : (
            <div className="text-center text-gray-600">No requests found</div>
          )}
        </div>
      </div>
    </div>
  );
}