'use client';

import { Button } from '@/components/ui/button';
import { useConnectWallet } from '@/hooks/use-connect-wallet';
import { Loader2, LogOut } from 'lucide-react';

export function ConnectWallet() {
  const { 
    address, 
    isConnected, 
    status, 
    error, 
    pendingConnector, 
    connect, 
    disconnect 
  } = useConnectWallet();

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