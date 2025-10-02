'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, Bell, Database, Zap } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { DomaEvent } from '@/hooks/use-doma-events';

interface DashboardStatsProps {
  recentNamesCount: number;
  activeListingsCount: number;
  events: DomaEvent[];
  loading: boolean;
}

export function DashboardStats({ recentNamesCount, activeListingsCount, events, loading }: DashboardStatsProps) {
  if (loading && events.length === 0) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  // Calculate stats from events
  const mintedCount = events.filter(e => e.type === 'NAME_TOKEN_MINTED').length;
  const transferredCount = events.filter(e => e.type === 'NAME_TOKEN_TRANSFER').length;
  // const burnedCount = events.filter(e => e.type === 'NAME_TOKEN_BURNED').length;

  const stats = [
    {
      title: 'Live Events',
      value: events.length.toString(),
      change: `+${mintedCount} new`,
      icon: Zap,
      description: 'Real-time activities',
    },
    {
      title: 'Domains Minted',
      value: mintedCount.toString(),
      change: `+${transferredCount} transfers`,
      icon: Database,
      description: 'This session',
    },
    {
      title: 'Active Listings',
      value: activeListingsCount.toString(),
      change: '+12%',
      icon: Badge,
      description: 'On marketplace',
    },
    {
      title: 'Alerts Ready',
      value: recentNamesCount.toString(),
      change: '+47',
      icon: Bell,
      description: 'Domains monitored',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> {stat.description}
            </p>
          </CardContent>
          {index === 0 && events.length > 0 && (
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <div className="w-2 h-2 bg-green-500 rounded-full absolute top-0" />
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}