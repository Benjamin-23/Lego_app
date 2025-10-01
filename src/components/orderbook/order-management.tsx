'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { orderbookApi } from '@/lib/orderbook-api';
import { Loader2, Search, X, CheckCircle, Clock } from 'lucide-react';

interface Order {
  id: string;
  type: 'LISTING' | 'OFFER';
  domain: string;
  price: string;
  currency: string;
  status: 'ACTIVE' | 'EXPIRED' | 'FULFILLED' | 'CANCELLED';
  createdAt: string;
  expiresAt: string;
}

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '3434-3675-5844-7264',
      type: 'LISTING',
      domain: 'vitalik.doma',
      price: '1.5',
      currency: 'ETH',
      status: 'ACTIVE',
      createdAt: '2024-01-15T10:30:00Z',
      expiresAt: '2024-02-15T10:30:00Z'
    },
    {
      id: '4434-4675-5844-8264',
      type: 'OFFER',
      domain: 'defi.doma',
      price: '0.8',
      currency: 'ETH',
      status: 'ACTIVE',
      createdAt: '2024-01-16T14:20:00Z',
      expiresAt: '2024-01-23T14:20:00Z'
    }
  ]);
  const [loading, setLoading] = useState<string | null>(null);
  const [searchOrderId, setSearchOrderId] = useState('');

  const handleCancelOrder = async (orderId: string, orderType: 'LISTING' | 'OFFER') => {
    setLoading(orderId);
    try {
      const cancelData = {
        orderId,
        signature: '0x' + '0'.repeat(130) // Placeholder signature
      };

      if (orderType === 'LISTING') {
        await orderbookApi.cancelListing(cancelData);
      } else {
        await orderbookApi.cancelOffer(cancelData);
      }

      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === orderId ? {...order, status: 'CANCELLED'} : order
      ));
    } catch (error) {
      console.error('Failed to cancel order:', error);
    } finally {
      setLoading(null);
    }
  };

  const handleSearchOrder = async () => {
    if (!searchOrderId) return;
    
    setLoading('search');
    try {
      // This would typically fetch order details from the API
      // For now, we'll just simulate a search
      console.log('Searching for order:', searchOrderId);
    } catch (error) {
      console.error('Failed to search order:', error);
    } finally {
      setLoading(null);
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    const variants = {
      ACTIVE: 'bg-green-100 text-green-800',
      EXPIRED: 'bg-gray-100 text-gray-800',
      FULFILLED: 'bg-blue-100 text-blue-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };
    
    const icons = {
      ACTIVE: <CheckCircle className="h-3 w-3" />,
      EXPIRED: <Clock className="h-3 w-3" />,
      FULFILLED: <CheckCircle className="h-3 w-3" />,
      CANCELLED: <X className="h-3 w-3" />
    };

    return (
      <Badge variant="outline" className={variants[status]}>
        {icons[status]}
        <span className="ml-1">{status.toLowerCase()}</span>
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Search */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Label>Search Order by ID</Label>
            <Input
              placeholder="Enter order ID (e.g., 3434-3675-5844-7264)"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleSearchOrder} disabled={loading === 'search'}>
              {loading === 'search' && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium">{order.domain}</span>
                    <Badge variant={order.type === 'LISTING' ? 'default' : 'secondary'}>
                      {order.type.toLowerCase()}
                    </Badge>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Order ID: {order.id} • {order.price} {order.currency}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-right text-sm text-muted-foreground">
                  Expires: {new Date(order.expiresAt).toLocaleDateString()}
                </div>
                {order.status === 'ACTIVE' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCancelOrder(order.id, order.type)}
                    disabled={loading === order.id}
                  >
                    {loading === order.id && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No orders found. Create your first listing or offer!
          </div>
        )}
      </CardContent>
    </Card>
  );
}