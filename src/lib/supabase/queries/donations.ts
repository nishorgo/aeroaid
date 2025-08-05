import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../client";

export type CreateDonation = {
    patient_name?: string;
    hospital?: string;
    location?: string;
    reference?: string;
    date?: string;
    donor_id?: string;
    requester_id?: string;
    status?: string;
  };


export const useCreateDonation = () => {
const queryClient = useQueryClient();

return useMutation({
    mutationFn: async ( donation: CreateDonation) => {
    const { data, error } = await supabase
        .from("donations")
        .insert(donation)
        .select()
        .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },
    onSuccess: () => {
        // Invalidate and refetch the query to update the data
        queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
    onError: (error) => {
        console.error("Error creating donation:", error);
    },
});
};

export const useGetDonationInvitations = (donorId: string) => {
  return useQuery({
    queryKey: ["invitations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("id, patient_name, hospital, location, reference, date")
        .eq("donor_id", donorId)
        .eq("status", "pending");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};


export const useGetFiveRecentDonationDates = (donorId: string) => {
  return useQuery({
    queryKey: ["recent-donations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("date")
        .eq("donor_id", donorId)
        .eq("status", "completed")
        .order("date", { ascending: false })
        .limit(5);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};


// Define types for the donation data
interface DonorProfile {
  id: string;
  full_name: string;
  contact: string;
  blood_group: string;
  area_name: string;
  avatar_url: string;
}

interface DonationItem {
  id: number;
  patient_name: string;
  hospital: string;
  location: string;
  reference: string;
  date: string;
  donor: DonorProfile | DonorProfile[];
}

export const useGetSentDonations = (requesterId: string) => {
  return useQuery({
    queryKey: ["sent_donations", requesterId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donations")
        .select(`
            id,
            patient_name,
            hospital,
            location,
            reference,
            date,
            donor:profiles!donor_id (
              id,
              full_name,
              contact,
              blood_group,
              area_name,
              avatar_url
            )
        `)
        .eq("requester_id", requesterId)
        .eq("status", "pending");

      if (error) {
        throw new Error(error.message);
      }

      // Transform the data to match the expected format
      return data?.map((item: DonationItem) => ({
        ...item,
        donor: Array.isArray(item.donor) ? item.donor[0] : item.donor
      })) || [];
    },
  });
};