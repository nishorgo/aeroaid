// src/app/(protected-pages)/layout.tsx
"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useProtectedRoute } from "@/hooks/use-protected-route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useProtectedRoute();
  const queryClient = new QueryClient();

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white pt-16">{children}</div>
    </QueryClientProvider>
  );
}