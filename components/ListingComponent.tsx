'use client';

import { useWalletClient, useAccount } from 'wagmi';
import { OrderbookType, viemToEthersSigner, createDomaOrderbookClient } from '@doma-protocol/orderbook-sdk';
import { Button } from './ui/button';

export function ListingComponent() {
  const { data: walletClient } = useWalletClient();
  console.log(walletClient, "wallet address")
  const { address } = useAccount();

  const client:any = createDomaOrderbookClient({
    apiClientOptions: {
      baseUrl: process.env.NEXT_PUBLIC_DOMA_API_URL!,
      apiKey: process.env.NEXT_PUBLIC_DOMA_API_KEY 
    }
  });

  const createListing = async () => {
    if (!walletClient || !address) return;

    const signer = viemToEthersSigner(walletClient, 'eip155:1');

    await client.createListing({
      params: {
          items: [{
              contract: '0x...',
              tokenId: '1',
              price: '1000000000000000000'
          }],
          orderbook: OrderbookType.DOMA,
          source: ''
      },
      signer,
      chainId: 'eip155:1',
      onProgress: (step:any, progress: any) => {
        console.log(`${step}: ${progress}%`);
      }
    });
  };

  return (
    <Button onClick={createListing} disabled={!walletClient}>
      Create Listing
    </Button>
  );
}