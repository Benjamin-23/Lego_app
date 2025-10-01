'use client';

import { useAccount } from 'wagmi';
import { ConnectWallet } from '@/components/connect-wallet';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { RecentDomains } from '@/components/dashboard/recent-domains';
import { ActiveListings } from '@/components/dashboard/active-listings';
import { LiveEvents } from '@/components/dashboard/live-events';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { SubscriptionStatus } from '@/components/dashboard/subscription-status';
import { DomainSearch } from '@/components/dashboard/domain-search';
import { CreateListing } from '@/components/orderbook/create-listing';
import { CreateOffer } from '@/components/orderbook/create-offer';
import { OrderManagement } from '@/components/orderbook/order-management';
import { LoadingState } from '@/components/loading-state';
import { useDomaData } from '@/hooks/use-doma-data';
import { useDomaEvents } from '@/hooks/use-doma-events';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Radio, Key, Eye, ShoppingCart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const { isConnected, status } = useAccount();
  const { recentNames, activeListings, loading: domaLoading, error: domaError } = useDomaData();
  const { events, loading: eventsLoading, error: eventsError,  pollEvents } = useDomaEvents(3000);

  const loading = domaLoading && eventsLoading;
  const error = domaError || eventsError;
  // const usingDemoData = domaUsingDemo || eventsUsingDemo;

  if (status === 'reconnecting' || status === 'connecting') {
    return <LoadingState />;
  }

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <div className="flex justify-between items-center mb-8 pt-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Loma - DOMA Alert System</h1>
            {events.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <Radio className="h-3 w-3 animate-pulse" />
                <span className="font-medium">{events.length} Live Events</span>
              </div>
            )}
          </div>
          <p className="text-muted-foreground mt-2">
            Real-time monitoring and trading for DOMA domains
          </p>
        </div>
        <ConnectWallet />
      </div>

      {/* API Status Alerts */}
      {/* {usingDemoData && (
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Eye className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Demo Mode:</strong> Using sample data. Add your DOMA API key to see real data.
          </AlertDescription>
        </Alert>
      )} */}

      {!process.env.NEXT_PUBLIC_DOMA_API_KEY && (
        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <Key className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>API Key Missing:</strong> Set <code>NEXT_PUBLIC_DOMA_API_KEY</code> in your environment variables to access real DOMA data.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}

      {isConnected ? (
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="offers">My Offers</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            <DomainSearch />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <DashboardStats 
                  recentNamesCount={recentNames.length}
                  activeListingsCount={activeListings.length}
                  events={events}
                  loading={loading}
                />
              </div>
              <div>
                <SubscriptionStatus />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <LiveEvents events={events} loading={eventsLoading} onRefresh={pollEvents} />
              </div>
              <div className="space-y-8">
                <RecentDomains domains={recentNames} loading={domaLoading} />
                <ActiveListings listings={activeListings} loading={domaLoading} />
              </div>
            </div>
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingCart className="h-6 w-6" />
              <h2 className="text-2xl font-bold">DOMA Marketplace</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CreateListing />
              <CreateOffer />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <OrderManagement />
            </div>
          </TabsContent>

          {/* Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <h2 className="text-2xl font-bold">My Domain Listings</h2>
            <OrderManagement />
          </TabsContent>

          {/* Offers Tab */}
          <TabsContent value="offers" className="space-y-6">
            <h2 className="text-2xl font-bold">My Domain Offers</h2>
            <OrderManagement />
          </TabsContent>
        </Tabs>
      ) : (
        // ... keep existing disconnected state
        <div className="text-center py-12">
          {/* ... existing disconnected content ... */}
        </div>
      )}
    </main>
  );
}