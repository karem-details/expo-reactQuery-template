import {
  useQuery,
  useMutation,
  UseMutationOptions,
  UseQueryOptions,
  useQueryClient,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axiosClient from '@/api/client';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { ErrorHandler } from '@/util/errorHandler';

// useFetch with manual triggering
export const useFetch = <TData = any>(
  endpoint: string,
  queryKey: string[],
  options: Omit<
    UseQueryOptions<TData, AxiosError>,
    'queryKey' | 'queryFn'
  > = {},
  params?: any
) => {
  const queryClient = useQueryClient();

  const query = useQuery<TData, AxiosError>({
    queryKey,
    queryFn: async ({ signal }) => {
      const response = await axiosClient.get(endpoint, { params, signal });
      return response.data;
    },
    ...options,
  });

  // Function to manually trigger refetch
  const refetch = async () => {
    return await query.refetch();
  };

  // Function to invalidate the query (useful for refreshing after mutations)
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  return {
    ...query,
    refetch,
    invalidate,
  };
};

export type PaginatedResponseData<T> = {
  data: T[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
  };
};

export interface PaginationInfo {
  total: number;
  per_page: number;
  current_page: number;
}

export interface ApiResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

export interface UsePaginationFetchOptions {
  params?: Record<string, any>;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
}

export interface UsePaginationFetchReturn<T> {
  data: T[];
  pagination?: PaginationInfo;
  hasMore: boolean;
  loadMore: () => void;
  isLoadingMore: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  isRefetching: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  isFetchingNextPage: boolean;
  isFetchingPreviousPage: boolean;
}

export const usePaginationFetch2 = <T = any>(
  url: string,
  queryKey: string,
  options: UsePaginationFetchOptions = {}
): UsePaginationFetchReturn<T> => {
  const {
    params = {},
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
    cacheTime = 10 * 60 * 1000, // 10 minutes
  } = options;

  const fetchPage = async ({ pageParam = 1 }): Promise<ApiResponse<T>> => {
    const config: AxiosRequestConfig = {
      params: {
        ...params,
        page: pageParam,
      },
    };

    const response = await axiosClient.get<ApiResponse<T>>(url, config);
    return response.data.data;
  };

  const query: UseInfiniteQueryResult<ApiResponse<T>, Error> = useInfiniteQuery(
    {
      queryKey: [queryKey, params],
      queryFn: fetchPage,
      enabled,
      staleTime,
      cacheTime,
      getNextPageParam: (lastPage: ApiResponse<T>) => {
        const { pagination } = lastPage;
        const { current_page, total, per_page } = pagination;
        const totalPages = Math.ceil(total / per_page);

        return current_page < totalPages ? current_page + 1 : undefined;
      },
      getPreviousPageParam: (firstPage: ApiResponse<T>) => {
        const { pagination } = firstPage;
        return pagination.current_page > 1
          ? pagination.current_page - 1
          : undefined;
      },
    }
  );

  // Flatten all pages data into a single array
  const allData: T[] = query.data?.pages?.flatMap((page) => page.data) || [];

  // Get pagination info from the last page
  const lastPage = query.data?.pages?.[query.data.pages.length - 1];
  const pagination = lastPage?.pagination;

  return {
    data: allData,
    pagination,
    hasMore: query.hasNextPage ?? false,
    loadMore: query.fetchNextPage,
    isLoadingMore: query.isFetchingNextPage,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isRefetching: query.isRefetching,
    hasNextPage: query.hasNextPage ?? false,
    hasPreviousPage: query.hasPreviousPage ?? false,
    fetchNextPage: query.fetchNextPage,
    fetchPreviousPage: query.fetchPreviousPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isFetchingPreviousPage: query.isFetchingPreviousPage,
  };
};

// POST request hook with error handling
export const usePost = <TData = any, TVariables = any>(
  endpoint: string,
  options: UseMutationOptions<TData, AxiosError, TVariables> = {}
) => {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (data: TVariables) => {
      const response = await axiosClient.post(endpoint, data);
      return response.data;
    },
    onError(error, variables, context) {
      ErrorHandler.handleMutationError(error);

      if (options.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};

// PUT request hook with error handling
export const usePut = <TData = any, TVariables = any>(
  endpoint: string,
  options: UseMutationOptions<TData, AxiosError, TVariables> = {}
) => {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (data: TVariables) => {
      const response = await axiosClient.put(endpoint, data);
      return response.data;
    },
    onError(error, variables, context) {
      ErrorHandler.handleMutationError(error);

      if (options.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};
