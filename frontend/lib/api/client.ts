import {
  ApiError,
  CreateUrlRequest,
  URLData,
  DashboardResponse,
} from "@/types/types";
import { prepareAuthHeader } from "../../utils/auth/prepareAuthHeader";

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

  async createUrl(
    data: CreateUrlRequest,
    token: string | null,
  ): Promise<URLData> {
    const authHeader = prepareAuthHeader(token);
    const endpoint = token ? "/create-url" : "/create-url-guest";

    return this.makeRequest<URLData>(endpoint, {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
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
