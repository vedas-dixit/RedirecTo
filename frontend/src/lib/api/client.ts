import {
  ApiError,
  CreateUrlRequest,
  URLData,
  DashboardResponse,
} from "@/types/types";
import { prepareAuthHeader } from "../../../utils/auth/prepareAuthHeader";
import { getOrCreateGuestUuid } from "../../../utils/auth/generateGuestUuid";

const API_BASE_URL = "http://127.0.0.1:8000";

class ApiClient {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          detail:
            errorData.detail ||
            `HTTP ${response.status}: ${response.statusText}`,
        } as ApiError;
      }

      return response.json();
    } catch (error) {
      if (error && typeof error === "object" && "status" in error) {
        throw error; // Re-throw API errors
      }

      // Network or parsing errors
      throw {
        status: 0,
        detail:
          error instanceof Error ? error.message : "Network error occurred",
      } as ApiError;
    }
  }

  async getDashboardData(userId: string): Promise<DashboardResponse> {
    return this.makeRequest<DashboardResponse>(
      `/dashboard/overview?user_id=${userId}`,
    );
  }
  async verifyProtectedUrl(shortCode: string, password: string): Promise<{ destination: string }> {
  return this.makeRequest<{ destination: string }>(`/verify-password`, {
    method: "POST",
    body: JSON.stringify({ short_code: shortCode, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

  async createUrl(
    data: CreateUrlRequest,
    token: string | null,
  ): Promise<URLData> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add Authorization header if token exists
    if (token) {
      const authHeader = prepareAuthHeader(token);
      headers.Authorization = authHeader;
    }

    // Always add guest UUID header for tracking
    // This helps with rate limiting even for auth users (if needed)
    const guestUuid = getOrCreateGuestUuid();
    if (guestUuid) {
      headers["X-Guest-UUID"] = guestUuid;
    }

    const endpoint = "/create-url";

    return this.makeRequest<URLData>(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
  }

  async deleteUrl(urlId: string): Promise<{ success: boolean }> {
    // Adjust endpoint as needed to match your backend
    return this.makeRequest<{ success: boolean }>(`/delete-url/${urlId}`, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient();
