"use client";
import {
  QueryClientProvider,
  useIsFetching,
  useIsMutating,
} from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { QueryProviderProps } from "@/types/types";
import GlassyLoader from "@/component/UI/GlassyLoader";

function QueryLoader() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const loading = isFetching > 0 || isMutating > 0;
  return <GlassyLoader loading={loading} />;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryLoader />
      {children}
    </QueryClientProvider>
  );
}
