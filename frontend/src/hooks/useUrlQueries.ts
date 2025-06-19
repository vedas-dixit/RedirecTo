import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useToast } from "@/providers/QueryProvider";

import { prepareUserPayload } from "../../utils/auth/prepareUserPayload";
import { ApiError, CreateUrlRequest, DashboardResponse } from "@/types/types";
import { getOrCreateGuestUuid } from "../../utils/auth/generateGuestUuid";
import { useCallback, useMemo } from "react";
import { apiClient } from "@/lib/api/client";
import React from "react";

// Query Keys - More specific and hierarchical
export const urlQueryKeys = {
  all: ["urls"] as const,
  dashboard: (userId: string) =>
    [...urlQueryKeys.all, "dashboard", userId] as const,
  url: (urlId: string) => [...urlQueryKeys.all, "url", urlId] as const,
};

// Dashboard Query Hook with better error handling and retry logic
export function useDashboardQuery(enabled: boolean = true) {
  const { user } = useAuth();
  const userId = user?.id || getOrCreateGuestUuid();
  const { showToast } = useToast();

  const queryResult = useQuery({
    queryKey: urlQueryKeys.dashboard(userId),
    queryFn: () => apiClient.getDashboardData(userId),
    enabled: enabled && !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes (renamed from cacheTime)
    retry: (failureCount, error: ApiError) => {
      if (
        typeof error?.status === "number" &&
        error?.status >= 400 &&
        error?.status < 500
      ) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Show toast on error
  React.useEffect(() => {
    if (queryResult.isError && queryResult.error) {
      showToast({ message: queryResult.error.detail || "Failed to load dashboard", type: "error" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryResult.isError, queryResult.error]);

  return queryResult;
}
//update user
export const useUpdateUserMutation = () => {
  const { user } = useAuth();
  const userId = user?.id || getOrCreateGuestUuid();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (data: { name?: string; email?: string }) => {
      if (!userId) throw new Error("User ID is required");
      return apiClient.updateUserDetails({ user_id: userId, ...data });
    },
    onSuccess: () => {
      showToast({ message: "User updated successfully", type: "success" });
    },
    onError: (error: ApiError) => {
      showToast({ message: error.detail || "Failed to update user", type: "error" });
    },
  });
};

// NEW: Create User mutation hook
export function useCreateUserMutation() {
  const { getAccessToken } = useAuth();
  const { showToast } = useToast();

  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: async () => {
      const token = getAccessToken();
      return apiClient.createUser(token);
    },
    onSuccess: () => {
      showToast({ message: "User created/retrieved successfully", type: "success" });
    },
    onError: (error: ApiError) => {
      showToast({ message: error.detail || "Failed to create/retrieve user", type: "error" });
    },
  });
}

// Create URL Mutation Hook with optimistic updates
export function useCreateUrlMutation() {
  const queryClient = useQueryClient();
  const { user, getAccessToken } = useAuth();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (submitData: Omit<CreateUrlRequest, "user">) => {
      const token = getAccessToken();
      const userPayload = prepareUserPayload(user);
      const finalPayload: CreateUrlRequest = {
        ...submitData,
        user: userPayload,
      };
      return apiClient.createUrl(finalPayload, token);
    },
    onMutate: async (submitData) => {
      const longUrl = submitData.long_url;
      await queryClient.cancelQueries({
        queryKey: urlQueryKeys.dashboard(user?.id || getOrCreateGuestUuid()),
      });
      const previousData = queryClient.getQueryData<DashboardResponse>(
        urlQueryKeys.dashboard(user?.id || getOrCreateGuestUuid()),
      );
      if (previousData) {
        const tempUrl = {
          id: `temp-${Date.now()}`,
          shortUrl: "Creating...",
          destination: longUrl,
          clicks: 0,
          ttl: submitData.expires_at || "∞",
          status: "Creating",
          protected: !!submitData.password,
          createdAt: new Date().toISOString().split("T")[0],
        };
        queryClient.setQueryData<DashboardResponse>(
          urlQueryKeys.dashboard(user?.id || getOrCreateGuestUuid()),
          {
            ...previousData,
            urls: [tempUrl, ...previousData.urls],
            summary: {
              ...previousData.summary,
              totalUrls: previousData.summary.totalUrls + 1,
            },
          },
        );
      }
      return { previousData };
    },
    onSuccess: (data) => {
      showToast({ message: "Short URL created!", type: "success" });
      queryClient.setQueryData<DashboardResponse>(
        urlQueryKeys.dashboard(user?.id || getOrCreateGuestUuid()),
        (oldData) => {
          if (!oldData) return oldData;
          const filteredUrls = oldData.urls.filter(
            (url) => !url.id.startsWith("temp-"),
          );
          return {
            ...oldData,
            urls: [data, ...filteredUrls],
            summary: {
              ...oldData.summary,
              totalUrls: filteredUrls.length + 1,
            },
          };
        },
      );
    },
    onError: (error: ApiError, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          urlQueryKeys.dashboard(user?.id || getOrCreateGuestUuid()),
          context.previousData,
        );
      }
      showToast({ message: error.detail || "Error creating URL", type: "error" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: urlQueryKeys.dashboard(user?.id || getOrCreateGuestUuid()),
      });
    },
  });
}

// Delete URL Mutation Hook (if needed)
export function useDeleteUrlMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (urlId: string) => {
      return apiClient.deleteUrl(urlId);
    },
    onMutate: async (urlId: string) => {
      await queryClient.cancelQueries({
        queryKey: urlQueryKeys.dashboard(user?.id || getOrCreateGuestUuid()),
      });
      const previousData = queryClient.getQueryData<DashboardResponse>(
        urlQueryKeys.dashboard(user?.id || getOrCreateGuestUuid()),
      );
      if (previousData) {
        const filteredUrls = previousData.urls.filter(
          (url) => url.id !== urlId,
        );
        queryClient.setQueryData<DashboardResponse>(
          urlQueryKeys.dashboard(user?.id || getOrCreateGuestUuid()),
          {
            ...previousData,
            urls: filteredUrls,
            summary: {
              ...previousData.summary,
              totalUrls: filteredUrls.length,
            },
          },
        );
      }
      return { previousData };
    },
    onSuccess: () => {
      showToast({ message: "URL deleted", type: "success" });
    },
    onError: (error: ApiError, urlId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          urlQueryKeys.dashboard(user?.id || getOrCreateGuestUuid()),
          context.previousData,
        );
      }
      showToast({ message: error.detail || "Error deleting URL", type: "error" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: urlQueryKeys.dashboard(user?.id || getOrCreateGuestUuid()),
      });
    },
  });
}

// Enhanced URL Management Hook with memoized computed values
export function useUrlManagement() {
  const dashboardQuery = useDashboardQuery();
  const createUrlMutation = useCreateUrlMutation();
  const deleteUrlMutation = useDeleteUrlMutation();
  // Memoized computed values to prevent unnecessary re-renders
  const computedData = useMemo(() => {
    const data = dashboardQuery.data as DashboardResponse | undefined;
    return {
      urls: data?.urls || [],
      summary: data?.summary || {
        totalUrls: 0,
        totalClicks: 0,
        protectedUrls: 0,
        recentClick: null,
      },
      clicksOverTime: data?.clicksOverTime || [],
      countryData: data?.countryData || [],
      recentActivity: data?.recentActivity || [],
    };
  }, [dashboardQuery.data]);
  // Memoized callback functions
  const refetchDashboard = useCallback(() => {
    return dashboardQuery.refetch();
  }, [dashboardQuery]);
  const createUrl = useCallback(
    (submitData: Omit<CreateUrlRequest, "user">) => {
      return createUrlMutation.mutate(submitData);
    },
    [createUrlMutation],
  );
  const deleteUrl = useCallback(
    (urlId: string) => {
      return deleteUrlMutation.mutate(urlId);
    },
    [deleteUrlMutation],
  );
  const useVerifyPasswordMutation = () => {
    const { showToast } = useToast();
    return useMutation({
      mutationFn: ({
        shortCode,
        password,
      }: {
        shortCode: string;
        password: string;
      }) => apiClient.verifyProtectedUrl(shortCode, password),
      onError: (error: ApiError) => {
        showToast({ message: error.detail || "Password verification failed", type: "error" });
      },
      onSuccess: () => {
        showToast({ message: "Password verified!", type: "success" });
      },
    });
  };
  return {
    // Dashboard data
    ...computedData,
    isDashboardLoading: dashboardQuery.isLoading,
    isDashboardError: dashboardQuery.isError,
    dashboardError: dashboardQuery.error as ApiError | null,
    refetchDashboard,
    // Create URL mutation
    createUrl,
    isCreating: createUrlMutation.isPending,
    isCreateError: createUrlMutation.isError,
    createError: createUrlMutation.error as ApiError | null,
    createSuccess: createUrlMutation.isSuccess,
    resetCreateState: createUrlMutation.reset,
    //verify protected url
    useVerifyPasswordMutation,
    // Delete URL mutation
    deleteUrl,
    isDeleting: deleteUrlMutation.isPending,
    isDeleteError: deleteUrlMutation.isError,
    deleteError: deleteUrlMutation.error as ApiError | null,
  };
}
