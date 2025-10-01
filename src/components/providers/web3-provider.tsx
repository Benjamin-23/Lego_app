'use client';

import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/web3';
import { QueryProvider } from './query-client-provider';

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryProvider>
        {children}
      </QueryProvider>
    </WagmiProvider>
  );
}