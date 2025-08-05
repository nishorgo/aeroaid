'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HighlightedText from '@/components/HighlightedText';
import InputField from '@/components/InputField';
import HistoryCard from '@/components/HistoryCard';
import { Count } from '@/components/MechanicalFont';
import { useCreateHistory, useGetHistoryofUser } from '@/lib/supabase/queries/history';
import AreaDropdown from '@/components/AreaDropdown';
import { areas } from '@/data/dropdown';
import { useAuthStore } from '@/lib/stores/use-auth-store';
import LoadingSpinner from '@/components/LoadingSpinner';


export default function History() {
  const [formData, setFormData] = useState({
    patient_name: '',
    hospital: '',
    location: '',
    reference: '',
    date: '',
  });
  const { profile } = useAuthStore();
  const { mutateAsync: createHistory } = useCreateHistory();
  const { data: historyData, isLoading, error } = useGetHistoryofUser(profile?.id || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const history = { ...formData, donor_id: profile?.id, status: 'completed' };
      await createHistory(history);
      setFormData({ patient_name: '', hospital: '', location: '', reference: '', date: '' }); // Reset form after successful submission
    } catch (error) {
      console.error('Error creating history:', error);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-md mx-auto p-4">
        {/* Header with Count */}
        <div className="mb-8">
          <HighlightedText text="BLOOD DONATION HISTORY" className="mb-4" />
          {historyData && <div className="flex justify-center">
            <Count number={historyData.length} />
          </div>}
        </div>


        {/* New Entry Form */}
        <div className="mb-8">
          <HighlightedText text="ENTER NEW" bgColor='bg-yellow-400' fontColor='text-gray-700' textAlign='left' className="mb-4" />
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Patient Name"
              type="text"
              value={formData.patient_name}
              onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
              required
            />
            <InputField
              label="Hospital"
              type="text"
              value={formData.hospital}
              onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
              required
            />
            <AreaDropdown
              value={formData.location}
              onChange={(value) =>
                setFormData({ ...formData, location: value })
              }
              locations={areas}
              required
            />
            <InputField
              label="Reference"
              type="text"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              required
            />
            <div className='space-y-1'>
              <label className="block text-md font-semibold tracking-widest uppercase text-gray-600">
                Donation Date
              </label>
              <input
               
                type="date" 
                value={formData.date} 
                onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                max={new Date().toISOString().split('T')[0]}
                required
                className="w-full h-10 px-3 rounded bg-gray-100 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold tracking-wider hover:bg-red-600 transition-colors"
            >
              ENTER
            </button>
          </form>
        </div>

        {/* History List */}
        <div>
          <HighlightedText text="HISTORY" bgColor='bg-yellow-400' fontColor='text-gray-700' textAlign='left' className="mb-4" />
          <div className="space-y-4">
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="text-center text-red-600 font-semibold tracking-widest">ERROR LOADING HISTORY DATA</div>
            ) : historyData && historyData.length > 0 ? (
              historyData.map((record, index: number) => (
                <HistoryCard key={record.id || index} {...record} />
              ))
            ) : (
              <div className="text-center text-gray-600">No history records found</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
