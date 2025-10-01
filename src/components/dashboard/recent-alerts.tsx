'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const alerts = [
  {
    id: 1,
    domain: 'vitalik.doma',
    type: 'expiration',
    status: 'pending',
    time: '2 hours ago',
    priority: 'high',
  },
  {
    id: 2,
    domain: 'defi.doma',
    type: 'sale',
    status: 'completed',
    time: '5 hours ago',
    priority: 'medium',
  },
  {
    id: 3,
    domain: 'nft.doma',
    type: 'bid',
    status: 'active',
    time: '12 hours ago',
    priority: 'low',
  },
];

export function RecentAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium">{alert.domain}</p>
                  <p className="text-sm text-muted-foreground capitalize">{alert.type}</p>
                </div>
                <Badge variant={
                  alert.priority === 'high' ? 'destructive' :
                  alert.priority === 'medium' ? 'default' : 'secondary'
                }>
                  {alert.priority}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{alert.time}</p>
                <Badge variant={
                  alert.status === 'completed' ? 'default' :
                  alert.status === 'active' ? 'secondary' : 'outline'
                }>
                  {alert.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}