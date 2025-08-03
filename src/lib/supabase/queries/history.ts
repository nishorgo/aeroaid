import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../client";

export type DonationData = {
    patient_name?: string;
    hospital?: string;
    location?: string;
    reference?: string;
    date?: string;
    donor_id?: string;
    status?: string;
  };

export type HistoryData = {
    id?: string;
    patient_name?: string;
    hospital?: string;
    location?: string;
    reference?: string;
    date?: string;
    donor_id?: string;
    status?: string;
  };


export const useCreateHistory = () => {
const queryClient = useQueryClient();

return useMutation({
    mutationFn: async ( history: DonationData) => {
    const { data, error } = await supabase
        .from("donations")
        .insert(history)
        .select()
        .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },
    onSuccess: () => {
        // Invalidate and refetch the query to update the data
        queryClient.invalidateQueries({ queryKey: ["history"] });
    },
    });
};


export const useGetHistoryofUser = (id: string) => {
  return useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("id, patient_name, hospital, location, reference, date")
        .eq("donor_id", id)
        .eq("status", "completed");
      if (error) {
        throw new Error(error.message);
      }
      return data as HistoryData[];
    },
  });
};