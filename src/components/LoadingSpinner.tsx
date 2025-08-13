import { Loader } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader className="animate-spin text-yellow-400 " />
    </div>
  );
}
