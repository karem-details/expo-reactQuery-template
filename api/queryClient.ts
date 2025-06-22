import { ErrorHandler } from '@/util/errorHandler';
import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// Qeury client with global configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000, // 5 Seconds
      retry: (failureCount, error) => {
        const genericError = error as AxiosError;
        // Don't retry on 401/403/404
        if (
          genericError?.response?.status === 401 ||
          genericError?.response?.status === 403 ||
          genericError?.response?.status === 404
        ) {
          ErrorHandler.handleQueryError(genericError);
          return false;
        }
        ErrorHandler.handleQueryError(genericError);
        return failureCount < 2; // Retry other errors twice
      },
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnMount: true, // Refetch when component mounts
      refetchOnReconnect: true, // Refetch when reconnecting
      //throwOnError: false, // Don't throw errors to React Error Boundary
      networkMode: 'online', // Control when network requests are made (always, online, offlineFirst)
    },
    mutations: {
      retry: false,
      //throwOnError: false, // Don't throw errors to React Error Boundary
      networkMode: 'online', // Control when network requests are made
      onError: (error, variables, context) => {
        const genericError = error as AxiosError;
        // Global error handling for mutations
        ErrorHandler.handleMutationError(genericError);
      },
    },
  },
});
