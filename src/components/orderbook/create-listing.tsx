'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAccount } from 'wagmi';
import { orderbookApi, CreateOrderRequest } from '@/lib/orderbook-api';
import { Loader2, Plus, X } from 'lucide-react';
import { useSignTypedData } from 'wagmi';

export function CreateListing() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    orderbook: 'DOMA' as 'OPENSEA' | 'DOMA',
    chainId: 'eip155:1',
    domainName: '',
    price: '',
    currency: 'ETH',
    duration: '30', // days
  });
 
  // --- Add wagmi signTypedData hook ---
  const { signTypedDataAsync } = useSignTypedData();

  const handleCreateListing = async () => {
    if (!address) return;
    setLoading(true);
    try {
      // 1. Generate proper order parameters
      const domain = formData.domainName;
      const price = formData.price;
      const chainId = formData.chainId;
      const orderbook = formData.orderbook;
      const currency = formData.currency;
      const duration = formData.duration;
      const startTime = Math.floor(Date.now() / 1000);
      const endTime = startTime + parseInt(duration) * 86400;
      const salt = '0x' + Math.floor(Math.random() * 1e18).toString(16);

      // EIP-712 domain and types
      const eip712Domain = {
        name: 'DOMAOrderbook',
        version: '1',
        chainId: 1, // You may want to map chainId string to number
        verifyingContract: '0x0000000000000000000000000000000000000000', // Replace with your contract
      };
      const orderTypes = {
        Order: [
          { name: 'domain', type: 'string' },
          { name: 'price', type: 'uint256' },
          { name: 'seller', type: 'address' },
          { name: 'currency', type: 'string' },
          { name: 'startTime', type: 'uint256' },
          { name: 'endTime', type: 'uint256' },
          { name: 'salt', type: 'bytes32' },
        ],
      };
      const order = {
        domain,
        price: price,
        seller: address,
        currency,
        startTime,
        endTime,
        salt,
      };

      // 2. Create EIP-712 signature with wagmi
      let signature = '';
      try {
        signature = await signTypedDataAsync({
          domain: eip712Domain,
          types: orderTypes,
          primaryType: 'Order',
          message: order,
        });
      } catch (err) {
        throw new Error('Signature failed: ' + (err instanceof Error ? err.message : String(err)));
      }

      // 3. Send to API
      const orderData: CreateOrderRequest = {
        orderbook,
        chainId,
        parameters: {
          ...order,
          startTime: String(startTime),
          endTime: String(endTime),
          offerer: address,
          zone: address,
          orderType: 0,
          zoneHash: '',
          offer: [],
          consideration: [],
          totalOriginalConsiderationItems: 2,
          conduitKey: '',
          counter: ''
        },
        signature,
      };
      console.log('Creating listing with data:', orderData);
      const result = await orderbookApi.createListing(orderData);
      console.log('Listing created:', result);
      // Handle success
    } catch (error) {
      console.error('Failed to create listing:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create Domain Listing
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Price</Label>
            <Input
              type="number"
              placeholder="0.1"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
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
          <div>
            <Label>Duration (days)</Label>
            <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Chain</Label>
          <Select value={formData.chainId} onValueChange={(value) => setFormData({...formData, chainId: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eip155:1">Ethereum Mainnet</SelectItem>
              <SelectItem value="eip155:137">Polygon</SelectItem>
              <SelectItem value="eip155:11155111">Sepolia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleCreateListing} 
          disabled={loading || !formData.domainName || !formData.price}
          className="w-full"
        >
          {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Create Listing
        </Button>

        <div className="text-xs text-muted-foreground">
          <Badge variant="outline" className="mr-2">Gas Fee Required</Badge>
          <Badge variant="outline">Signature Required</Badge>
        </div>
      </CardContent>
    </Card>
  );
}