import { ApiError } from "@/types/types";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount: number, error: unknown) => {
        const apiError = error as ApiError;
        if (
          typeof apiError.status === "number" &&
          apiError.status >= 400 &&
          apiError.status < 500
        ) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: false,
    },
  },
});
