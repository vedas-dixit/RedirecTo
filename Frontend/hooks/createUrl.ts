import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { prepareAuthHeader } from "../utils/auth/prepareAuthHeader";
import { prepareUserPayload } from "../utils/auth/prepareUserPayload";

export const useCreateUrl = () => {
  const { user, getAccessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUrl = async (longUrl: string) => {
    const token = getAccessToken(); // Can be null
    const authHeader = prepareAuthHeader(token);
    const userPayload = prepareUserPayload(user);

    setLoading(true);
    setError(null);


    try {
      console.log(userPayload)
      const response = await fetch("http://127.0.0.1:8000/create-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify({
          long_url: longUrl,
          user: userPayload, // Send full user object to backend
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create URL");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error creating URL:", errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createUrl, loading, error };
};
