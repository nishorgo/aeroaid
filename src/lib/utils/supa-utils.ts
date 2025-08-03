
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

export const getImageUrl = (bucket: string, path: string | null) => {
    if (!path) return null;
    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
  };