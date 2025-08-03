'use client';

import LoadingSpinner from "@/components/LoadingSpinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

const queryClient = new QueryClient();

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </QueryClientProvider>
  );
}
