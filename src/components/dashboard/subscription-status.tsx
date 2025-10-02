'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAccount } from 'wagmi';

export function SubscriptionStatus() {
  const { address } = useAccount();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Current Plan</span>
          <Badge variant="secondary">Pro</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Expires</span>
          <span className="text-sm">Dec 15, 2025</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Alerts Used</span>
          <span className="text-sm">12/50</span>
        </div>

        <div className="pt-4 space-y-2">
          <Button className="w-full" variant="outline">
            Upgrade Plan
          </Button>
          <Button className="w-full">
            Manage Subscription
          </Button>
        </div>

        {address && (
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground break-all">
              Connected: {address.slice(0, 8)}...{address.slice(-6)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}