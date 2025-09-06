import { AlertRuleBuilder } from "@/components/alert-rule-builder"
import { AlertHistoryComponent } from "@/components/alert-history"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Plus, Activity, CheckCircle, AlertTriangle, Clock } from "lucide-react"

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bell className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Alert Center</h1>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Alert Rule
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Alert Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Monitoring domains</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Successfully sent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">In queue</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history" className="space-y-6">
          <TabsList>
            <TabsTrigger value="history">Alert History</TabsTrigger>
            <TabsTrigger value="rules">Manage Rules</TabsTrigger>
            <TabsTrigger value="channels">Notification Channels</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <AlertHistoryComponent />
          </TabsContent>

          <TabsContent value="rules">
            <div className="space-y-6">
              {/* Active Rules */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Alert Rules</CardTitle>
                  <CardDescription>Manage your domain monitoring rules</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Domain Expiration Alert</p>
                        <p className="text-sm text-muted-foreground">
                          Monitors 15 domains • Triggers 30 days before expiry
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge>Active</Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Price Drop Opportunities</p>
                        <p className="text-sm text-muted-foreground">
                          Monitors 8 domains • Triggers on 10% price decrease
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge>Active</Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Domain Availability Watch</p>
                        <p className="text-sm text-muted-foreground">Monitors 23 domains • Triggers when available</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">Paused</Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rule Builder */}
              <AlertRuleBuilder />
            </div>
          </TabsContent>

          <TabsContent value="channels">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Channel Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Notification Channels</CardTitle>
                  <CardDescription>Configure how you receive alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Email Notifications</span>
                    </div>
                    <Badge variant="secondary">Connected</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Telegram Bot</span>
                    </div>
                    <Badge variant="secondary">Connected</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                      <span>SMS Notifications</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Setup
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                      <span>Twitter Integration</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Setup
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Channel Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Channel Performance</CardTitle>
                  <CardDescription>Delivery statistics by channel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email Success Rate</span>
                    <span className="font-medium text-green-600">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Telegram Success Rate</span>
                    <span className="font-medium text-green-600">99.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Delivery Time</span>
                    <span className="font-medium">2.3 seconds</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Failed Deliveries (24h)</span>
                    <span className="font-medium text-red-600">3</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
