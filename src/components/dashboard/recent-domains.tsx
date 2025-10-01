'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NameModel } from '@/lib/doma-api';
import { ExternalLink, Clock, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '../ui/button';

interface RecentDomainsProps {
  domains: NameModel[];
  loading: boolean;
}

export function RecentDomains({ domains, loading }: RecentDomainsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recently Tokenized Domains</CardTitle>
        </CardHeader>
        <CardContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full mb-2" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recently Tokenized Domains
          <Badge variant="secondary">{domains.length} domains</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {domains.slice(0, 8).map((domain) => (
            <div key={domain.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="font-mono font-medium text-sm">
                    {domain.name}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(domain.createdAt).toLocaleDateString()}
                    <User className="h-3 w-3 ml-2" />
                    {domain.owner.address.slice(0, 8)}...{domain.owner.address.slice(-6)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={
                  domain.claimStatus === 'CLAIMED' ? 'default' : 'secondary'
                }>
                  {domain.claimStatus.toLowerCase()}
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}