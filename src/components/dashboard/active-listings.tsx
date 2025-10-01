'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ListingModel } from '@/lib/doma-api';
import { ExternalLink, Tag, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface ActiveListingsProps {
  listings: ListingModel[];
  loading: boolean;
}

export function ActiveListings({ listings, loading }: ActiveListingsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Marketplace Listings</CardTitle>
        </CardHeader>
        <CardContent>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full mb-2" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Active Marketplace Listings
          <Badge variant="secondary">{listings.length} listings</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {listings.map((listing) => (
            <div key={listing.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-medium text-sm">
                  {listing.name.name}
                </span>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {listing.price} {listing.currency}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Listed {new Date(listing.createdAt).toLocaleDateString()}
                </div>
                <Button variant="ghost" size="sm" className="h-6 text-xs">
                  View Details
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}