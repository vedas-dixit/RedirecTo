import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useCreateUrl = () => {
  const { user, getAccessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Access token:', getAccessToken());
  }, [getAccessToken]);

  const createUrl = async (longUrl: string) => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    const token = getAccessToken();
    if (!token) {
      setError('No access token available');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/create-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          long_url: longUrl
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create URL');
      }

      const data = await response.json();
      console.log('URL created successfully:', data);
      return data;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error creating URL:', errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createUrl, loading, error };
};