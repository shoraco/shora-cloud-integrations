import useSWR from 'swr';
import { ShoraCloudClient } from '@shoracloud/sdk';

export function useCart(client: ShoraCloudClient) {
  const { data, error, isLoading, mutate } = useSWR(
    'cart',
    () => client.cart.get()
  );

  const addToCart = async (productId: string, quantity: number = 1) => {
    await client.cart.addItem(productId, quantity);
    mutate();
  };

  const removeFromCart = async (itemId: string) => {
    await client.cart.removeItem(itemId);
    mutate();
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    await client.cart.updateItemQuantity(itemId, quantity);
    mutate();
  };

  return {
    cart: data,
    error,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
}
