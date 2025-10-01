'use client';

import { useAccount } from 'wagmi';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { RecentAlerts } from '@/components/dashboard/recent-alerts';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { SubscriptionStatus } from '@/components/dashboard/subscription-status';
import { LoadingState } from '@/components/loading-state';
import { RedirectToHome } from '@/components/redirect-to-home';

export default function DashboardPage() {
  const { isConnected, status } = useAccount();

  if (status === 'reconnecting' || status === 'connecting') {
    return <LoadingState />;
  }

  if (!isConnected) {
    return <RedirectToHome />;
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardStats recentNamesCount={0} activeListingsCount={0} loading={false} />
        </div>
        <div>
          <SubscriptionStatus />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAlerts />
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Domain Insights</h2>
          <p className="text-muted-foreground">
            Your domain monitoring insights will appear here. Connect to DOMA protocol to see your watched domains.
          </p>
        </div>
      </div>
    </div>
  );
}