'use client';

import { useConnect, useAccount, useDisconnect } from 'wagmi';

export function useConnectWallet() {
  const { address, isConnected, status } = useAccount();
  const { connect, connectors, error, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    if (connectors[0]) {
      connect({ connector: connectors[0] });
    }
  };

  return {
    address,
    isConnected,
    status,
    error,
    pendingConnector,
    connect: handleConnect,
    disconnect,
    connectors
  };
}