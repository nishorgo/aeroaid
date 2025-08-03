import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../client";
import imageCompression from "browser-image-compression";

export type ProfileData = {
  id?: string;
  full_name?: string;
  blood_group?: string;
  date_of_birth?: Date;
  organization?: string;
  area_name: string;
  contact: string | null;
  bio?: string;
  avatar_url?: string;
  is_available: boolean;
}

export const useGetProfile = (id: string) => {
  return useQuery<ProfileData>({
    queryKey: ["profile", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
    enabled: !!id,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      profile,
    }: {
      userId: string;
      profile: ProfileData;
    }) => {
      if (profile.contact === "") {
        profile.contact = null;
      }
      const { data, error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", userId)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.userId],
      });
    },
  });
};

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: async ({ userId, file }: { userId: string; file: File }) => {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,         // Max file size in MB
        useWebWorker: true,    // Use web worker for better performance
      });

      const fileExt = file.name.split('.').pop();
       const filePath = `${userId}/avatar.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, compressedFile, { upsert: true });

      if (uploadError) throw uploadError;
        
      return uploadData.path; // Just return the file path/name
    }
  });
};


export const useGetProfileByAreaAndBloodGroup = (userId: string, bloodGroup: string, area?: string) => {
  return useQuery({
    queryKey: ["profile", area, bloodGroup],
    queryFn: async () => {
      const getPendingDonorIds = async () => {
        const { data: pendingDonations } = await supabase
          .from('donations')
          .select('donor_id')
          .eq('requester_id', userId)
          .eq('status', 'pending');
          
        return pendingDonations?.map((d: { donor_id: string }) => d.donor_id) || [];
      }
      
      let pendingDonorIds: string[] = [];
      if (userId !== '') {
        pendingDonorIds = await getPendingDonorIds();
      }
      
      let query = supabase
        .from('profiles')
        .select("*")
        .eq('blood_group', bloodGroup)
        
      if (pendingDonorIds.length > 0) {
        query = query.not('id', 'in', `(${pendingDonorIds.join(',')})`);
      }

      if (userId !== '') {
        query = query.neq('id', userId);
      }
      
      if (area) {
        query = query.eq("area_name", area);
      }

      const { data, error } = await query;
      if (error) {
        throw new Error(error.message);
      }

      console.log(data);
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
    enabled: !!bloodGroup || !!area,
  });
};
