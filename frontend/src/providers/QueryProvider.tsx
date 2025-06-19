"use client";
import {
  QueryClientProvider,
  useIsFetching,
  useIsMutating,
} from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { QueryProviderProps } from "@/types/types";
import GlassyLoader from "@/component/UI/GlassyLoader";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import GlassyToast from "@/component/UI/GlassyToast";

function QueryLoader() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const loading = isFetching > 0 || isMutating > 0;
  return <GlassyLoader loading={loading} />;
}

interface Toast {
  message: string;
  type?: "error" | "success" | "info";
}

interface ToastContextType {
  showToast: (toast: Toast) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<Toast | null>(null);
  const [visible, setVisible] = useState(false);
  const showToast = useCallback((toast: Toast) => {
    setToast(toast);
    setVisible(true);
    setTimeout(() => setVisible(false), 3500);
  }, []);
  const handleClose = () => setVisible(false);
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && visible && (
        <GlassyToast
          message={toast.message}
          type={toast.type}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
};

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <QueryLoader />
        {children}
      </QueryClientProvider>
    </ToastProvider>
  );
}
