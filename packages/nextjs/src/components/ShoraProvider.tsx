import React, { createContext, useContext } from 'react';
import { ShoraCloudClient } from '@shoracloud/sdk';
import { SWRConfig } from 'swr';

interface ShoraContextType {
  client: ShoraCloudClient;
}

const ShoraContext = createContext<ShoraContextType | null>(null);

export interface ShoraProviderProps {
  client: ShoraCloudClient;
  children: React.ReactNode;
}

export function ShoraProvider({ client, children }: ShoraProviderProps) {
  return (
    <ShoraContext.Provider value={{ client }}>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          shouldRetryOnError: false,
        }}
      >
        {children}
      </SWRConfig>
    </ShoraContext.Provider>
  );
}

export function useShora() {
  const context = useContext(ShoraContext);
  if (!context) {
    throw new Error('useShora must be used within a ShoraProvider');
  }
  return context;
}
