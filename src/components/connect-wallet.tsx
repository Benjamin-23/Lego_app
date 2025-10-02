'use client';

import { Button } from '@/components/ui/button';
import { useConnectWallet } from '@/hooks/use-connect-wallet';
import { Loader2, LogOut } from 'lucide-react';
 // Add account balance and symbol
 import { useEffect, useState } from 'react';
 import { useAccount, useBalance } from 'wagmi';
export function ConnectWallet() {
  const { 
    address, 
    isConnected, 
    status, 
    error, 
    pendingConnector, 
    connect, 
    disconnect,
  } = useConnectWallet();

 

  // Get the current account address from wagmi (if not already from useConnectWallet)
  const { address: wagmiAddress } = useAccount();
  const [balance, setBalance] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string | null>(null);

  // Use wagmi's useBalance to fetch balance and symbol
  const { data: balanceData } = useBalance({
    address: address || wagmiAddress,
    // 'enabled' is not a valid property for useBalance options, so we remove it.
    // useBalance will not fetch if address is undefined/null.
  });

  useEffect(() => {
    if (balanceData) {
      setBalance(balanceData.formatted);
      setSymbol(balanceData.symbol);
    }
  }, [balanceData]);
  if (status === 'reconnecting' || status === 'connecting') {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Connecting...
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm font-mono bg-muted px-3 py-1 rounded-md">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        {balance && symbol && (
          <span className="text-sm font-mono bg-muted px-3 py-1 rounded-md">
            {balance} {symbol}
          </span>
        )}
        <Button variant="outline" onClick={() => disconnect()} size="sm">
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={connect} disabled={!!pendingConnector}>
        {pendingConnector ? 'Connecting...' : 'Connect Wallet'}
      </Button>
      {error && (
        <span className="text-sm text-red-500">
          {error.message}
        </span>
      )}
    </div>
  );
}