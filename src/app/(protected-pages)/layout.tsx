// src/app/(protected-pages)/layout.tsx
"use client";

import { useProtectedRoute } from "@/hooks/use-protected-route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader } from "lucide-react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useProtectedRoute();
  const queryClient = new QueryClient();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white pt-16">{children}</div>
    </QueryClientProvider>
  );
}