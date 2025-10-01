'use client';

import { useWriteContract } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/lib/constants';
import LomaSubscriptionABI from '@/contracts/abis/LomaSubscription.json';

export function useSubscribe() {
  const { writeContract, isPending } = useWriteContract();

  const subscribe = (tier: number) => {
    writeContract({
      address: CONTRACT_ADDRESSES.LOMA_SUBSCRIPTION as `0x${string}`,
      abi: LomaSubscriptionABI,
      functionName: 'subscribe',
      args: [BigInt(tier)],
      value: BigInt(0), // Will need to handle dToken payments
    });
  };

  return { subscribe, isPending };
}