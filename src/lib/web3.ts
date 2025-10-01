import { createConfig, http } from '@wagmi/core';
import { mainnet, polygon } from '@wagmi/core/chains';
import { injected } from '@wagmi/connectors';
import { DOMA_CHAIN } from './constants';

export const config = createConfig({
  chains: [DOMA_CHAIN, mainnet, polygon],
  connectors: [injected()],
  transports: {
    [DOMA_CHAIN.id]: http(),
    [mainnet.id]: http()
    // Remove [polygon.id]: http() if polygon.id is the same as DOMA_CHAIN.id or mainnet.id
    // If all ids are unique, ensure no duplicate keys are present
  },
});


declare global {
  interface Window {
    ethereum?: any;
  }
}