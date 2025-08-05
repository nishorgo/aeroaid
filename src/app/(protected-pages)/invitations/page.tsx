'use client';

import Navbar from '@/components/Navbar';
import HighlightedText from '@/components/HighlightedText';
import { Count } from '@/components/MechanicalFont';
import HistoryCard from '@/components/HistoryCard';
import MechanicalDate from '@/components/MechanicalDate';
import { useGetDonationInvitations, useGetFiveRecentDonationDates } from '@/lib/supabase/queries/donations';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuthStore } from '@/lib/stores/use-auth-store';

interface DonationRequest {
  id: string;
  patient_name: string;
  hospital: string;
  location: string;
  reference: string;
  date: string;
  donor_id?: string;
  status?: string;
}

export default function RequestsPage() {
  const { profile } = useAuthStore();
  const { data: requests, isLoading, error } = useGetDonationInvitations(profile?.id || '');
  const { data: recentDonations, isLoading: recentDonationsLoading, error: recentDonationsError } = useGetFiveRecentDonationDates(profile?.id || '');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-md mx-auto p-4">
        {/* Header with Count */}
        <div className="mb-8">
          <HighlightedText text="DONATION INVITATIONS" className="mb-4" />
          <div className="flex justify-center">
            {requests && <Count number={requests.length} />}
          </div>
        </div>

        {/* Request History */}
        <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
              <LoadingSpinner />
          ) : error ? (
              <div className="text-center text-red-600 font-semibold tracking-widest">ERROR LOADING HISTORY DATA</div>
          ) : requests && requests.length > 0 ? (
              requests.map((record: DonationRequest, index: number) => (
                <HistoryCard key={record.id || index} {...record} />
              ))
            ) : (
              <div className="text-center text-gray-600">No invitations found</div>
            )}
        </div>

        {/* Recent Donation  */}
        <div className="flex justify-center mt-8">
          <HighlightedText text="MOST RECENT DONATIONS" className="mb-4" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {recentDonationsLoading ? (
            <LoadingSpinner />
          ) : recentDonationsError ? (
            <div className="text-center text-red-600 font-semibold tracking-widest">ERROR LOADING RECENT DONATION DATA</div>
          ) : recentDonations && recentDonations.length > 0 ? (
            recentDonations.map((date: { date: string }, index: number) => (
              <MechanicalDate key={index} date={date.date} />
            ))
          ) : (
            <div className="text-center text-gray-600">No recent donations found</div>
          )}
        </div>
      </div>
    </div>
  );
}
