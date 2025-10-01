'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SUBSCRIPTION_TIERS, TIER_PRICES } from '@/lib/constants';
import { useSubscribe } from '@/hooks/use-subscribe';

const TIERS = [
  {
    id: SUBSCRIPTION_TIERS.FREE,
    name: 'Free',
    price: TIER_PRICES[SUBSCRIPTION_TIERS.FREE],
    features: ['Basic domain alerts', '3 alerts per day', 'Email notifications'],
  },
  {
    id: SUBSCRIPTION_TIERS.PRO,
    name: 'Pro',
    price: TIER_PRICES[SUBSCRIPTION_TIERS.PRO],
    features: ['All domain alerts', 'Unlimited alerts', 'TG/X notifications', 'Priority support'],
  },
  {
    id: SUBSCRIPTION_TIERS.ENTERPRISE,
    name: 'Enterprise',
    price: TIER_PRICES[SUBSCRIPTION_TIERS.ENTERPRISE],
    features: ['Custom alert filters', 'API access', 'Dedicated bot instance', '24/7 support'],
  },
];

export function SubscriptionTiers() {
  const { subscribe, isPending } = useSubscribe();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {TIERS.map((tier) => (
        <Card key={tier.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {tier.name}
              {tier.id === SUBSCRIPTION_TIERS.PRO && (
                <Badge variant="secondary">Popular</Badge>
              )}
            </CardTitle>
            <CardDescription>
              {tier.price === 0 ? 'Free forever' : `${tier.price} dTokens/month`}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2 mb-6">
              {tier.features.map((feature) => (
                <li key={feature} className="text-sm">• {feature}</li>
              ))}
            </ul>
            <Button
              className="w-full"
              onClick={() => subscribe(tier.id)}
              disabled={isPending}
            >
              {isPending ? 'Processing...' : 'Subscribe'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}