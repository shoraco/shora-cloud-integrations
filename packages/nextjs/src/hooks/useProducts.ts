import useSWR from 'swr';
import { ShoraCloudClient } from '@shoracloud/sdk';

export interface UseProductsOptions {
  limit?: number;
  offset?: number;
  category?: string;
  search?: string;
  sort?: string;
}

export function useProducts(options: UseProductsOptions = {}, client: ShoraCloudClient) {
  const { data, error, isLoading, mutate } = useSWR(
    ['products', options],
    () => client.products.list(options)
  );

  return {
    products: data?.items ?? [],
    total: data?.total ?? 0,
    error,
    isLoading,
    mutate,
  };
}
