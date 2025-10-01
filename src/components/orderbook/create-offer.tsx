'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAccount } from 'wagmi';
import { orderbookApi } from '@/lib/orderbook-api';
import { Loader2, HandCoins } from 'lucide-react';

export function CreateOffer() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    orderbook: 'DOMA' as 'OPENSEA' | 'DOMA',
    chainId: 'eip155:1',
    domainName: '',
    offerPrice: '',
    currency: 'ETH',
    duration: '7', // days
  });

  const handleCreateOffer = async () => {
    if (!address) return;

    setLoading(true);
    try {
      // Similar to create listing but for offers
      const offerData = {
        orderbook: formData.orderbook,
        chainId: formData.chainId,
        parameters: {
          offerer: address,
          zone: '0x0000000000000000000000000000000000000000',
          orderType: 0,
          startTime: Math.floor(Date.now() / 1000).toString(),
          endTime: Math.floor(Date.now() / 1000 + parseInt(formData.duration) * 86400).toString(),
          zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
          salt: '0x' + Math.floor(Math.random() * 1e18).toString(16),
          offer: [],
          consideration: [],
          totalOriginalConsiderationItems: 0,
          conduitKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
          counter: '0'
        },
        signature: '0x' + '0'.repeat(130) // Placeholder
      };

      const result = await orderbookApi.createOffer(offerData);
      console.log('Offer created:', result);
      // Handle success
    } catch (error) {
      console.error('Failed to create offer:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HandCoins className="h-5 w-5" />
          Make Domain Offer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Domain Name</Label>
            <Input
              placeholder="e.g., vitalik.doma"
              value={formData.domainName}
              onChange={(e) => setFormData({...formData, domainName: e.target.value})}
            />
          </div>
          <div>
            <Label>Orderbook</Label>
            <Select value={formData.orderbook} onValueChange={(value: 'OPENSEA' | 'DOMA') => setFormData({...formData, orderbook: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DOMA">DOMA Orderbook</SelectItem>
                <SelectItem value="OPENSEA">OpenSea</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Offer Price</Label>
            <Input
              type="number"
              placeholder="0.05"
              value={formData.offerPrice}
              onChange={(e) => setFormData({...formData, offerPrice: e.target.value})}
            />
          </div>
          <div>
            <Label>Currency</Label>
            <Select value={formData.currency} onValueChange={(value) => setFormData({...formData, currency: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="DAI">DAI</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Offer Expires In</Label>
          <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 day</SelectItem>
              <SelectItem value="3">3 days</SelectItem>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="14">14 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleCreateOffer} 
          disabled={loading || !formData.domainName || !formData.offerPrice}
          className="w-full"
          variant="outline"
        >
          {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Make Offer
        </Button>
      </CardContent>
    </Card>
  );
}