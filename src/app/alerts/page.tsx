'use client';

import { useAccount } from 'wagmi';
import { AlertManager } from '@/components/alerts/alert-manager';
import { LoadingState } from '@/components/loading-state';
import { RedirectToHome } from '@/components/redirect-to-home';

export default function AlertsPage() {
  const { isConnected, status } = useAccount();

  if (status === 'reconnecting' || status === 'connecting') {
    return <LoadingState />;
  }

  if (!isConnected) {
    return <RedirectToHome />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Alert Management</h1>
      </div>
      <AlertManager />
    </div>
  );
}