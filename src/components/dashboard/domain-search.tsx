'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Zap } from 'lucide-react';

export function DomainSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Implement domain search logic
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search DOMA domains (e.g., vitalik.doma, defi.doma)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
          </div>
          <Button onClick={handleSearch} className="whitespace-nowrap">
            <Zap className="h-4 w-4 mr-2" />
            Search Domains
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {['vitalik', 'defi', 'nft', 'eth', 'crypto', 'web3'].map((tag) => (
            <Button
              key={tag}
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery(tag + '.doma')}
            >
              {tag}.doma
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}