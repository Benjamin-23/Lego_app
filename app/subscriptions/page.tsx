import { SubscriptionPlans } from "@/components/subscription-plans"
import { SubscriptionStatus } from "@/components/subscription-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Star, Crown } from "lucide-react"

export default function SubscriptionsPage() {
  const handleSelectPlan = (planId: string) => {
    console.log("Selected plan:", planId)
    // Handle plan selection logic here
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Users className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Subscriptions</h1>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            Pro Plan
          </Badge>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="status" className="space-y-6">
          <TabsList>
            <TabsTrigger value="status">Current Status</TabsTrigger>
            <TabsTrigger value="plans">All Plans</TabsTrigger>
            <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="status">
            <SubscriptionStatus />
          </TabsContent>

          <TabsContent value="plans">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Choose Your Plan</h2>
                <p className="text-muted-foreground mt-2">Upgrade or downgrade your subscription to match your needs</p>
              </div>
              <SubscriptionPlans currentPlanId="pro" onSelectPlan={handleSelectPlan} />
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Usage Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Usage Trends
                  </CardTitle>
                  <CardDescription>Your usage patterns over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average domains monitored</span>
                      <span className="font-medium">127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Peak alerts in a month</span>
                      <span className="font-medium">2,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bot commands growth</span>
                      <span className="font-medium text-green-600">+23%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">API usage efficiency</span>
                      <span className="font-medium">87%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                  <CardDescription>Optimize your subscription based on usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Perfect Fit</p>
                      <p className="text-sm text-blue-700">Your current Pro plan matches your usage patterns well.</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-medium text-green-900">Optimization Tip</p>
                      <p className="text-sm text-green-700">
                        Consider upgrading to Enterprise for unlimited domains if you plan to scale.
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm font-medium text-yellow-900">Usage Alert</p>
                      <p className="text-sm text-yellow-700">
                        You're using 85% of your bot command limit. Monitor usage closely.
                      </p>
                    </div>
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
