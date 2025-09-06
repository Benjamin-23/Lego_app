"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, CreditCard, AlertTriangle, CheckCircle } from "lucide-react"
import { SUBSCRIPTION_PLANS, type UserSubscription, type BillingHistory } from "@/lib/subscription-types"

export function SubscriptionStatus() {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [billingHistory, setBillingHistory] = useState<BillingHistory[]>([])

  // Mock data for demonstration
  useEffect(() => {
    const mockSubscription: UserSubscription = {
      id: "sub_123",
      userId: "user_456",
      planId: "pro",
      status: "active",
      currentPeriodStart: "2024-03-01T00:00:00Z",
      currentPeriodEnd: "2024-04-01T00:00:00Z",
      cancelAtPeriodEnd: false,
      usage: {
        domains: 127,
        alerts: 1250,
        botCommands: 8500,
        apiCalls: 15000,
      },
    }

    const mockBilling: BillingHistory[] = [
      {
        id: "inv_001",
        amount: 29.0,
        currency: "USD",
        status: "paid",
        date: "2024-03-01T00:00:00Z",
        description: "Pro Plan - March 2024",
        invoiceUrl: "#",
      },
      {
        id: "inv_002",
        amount: 29.0,
        currency: "USD",
        status: "paid",
        date: "2024-02-01T00:00:00Z",
        description: "Pro Plan - February 2024",
        invoiceUrl: "#",
      },
    ]

    setSubscription(mockSubscription)
    setBillingHistory(mockBilling)
  }, [])

  if (!subscription) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-muted-foreground">Loading subscription details...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentPlan = SUBSCRIPTION_PLANS.find((plan) => plan.id === subscription.planId)
  const usagePercentages = {
    domains:
      currentPlan?.limits.domains === -1 ? 0 : (subscription.usage.domains / (currentPlan?.limits.domains || 1)) * 100,
    alerts:
      currentPlan?.limits.alerts === -1 ? 0 : (subscription.usage.alerts / (currentPlan?.limits.alerts || 1)) * 100,
    botCommands:
      currentPlan?.limits.botCommands === -1
        ? 0
        : (subscription.usage.botCommands / (currentPlan?.limits.botCommands || 1)) * 100,
    apiCalls:
      currentPlan?.limits.apiCalls === -1
        ? 0
        : (subscription.usage.apiCalls / (currentPlan?.limits.apiCalls || 1)) * 100,
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "past_due":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "canceled":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "past_due":
        return "destructive"
      case "canceled":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Subscription</span>
            <Badge variant={getStatusColor(subscription.status)} className="flex items-center gap-1">
              {getStatusIcon(subscription.status)}
              {subscription.status}
            </Badge>
          </CardTitle>
          <CardDescription>
            {currentPlan?.name} Plan - ${currentPlan?.price}/month
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Billing Period
            </span>
            <span>
              {new Date(subscription.currentPeriodStart).toLocaleDateString()} -{" "}
              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </span>
          </div>

          {subscription.cancelAtPeriodEnd && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Your subscription will be canceled at the end of the current billing period.
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <CreditCard className="h-4 w-4 mr-2" />
              Update Payment
            </Button>
            <Button variant="outline" size="sm">
              Change Plan
            </Button>
            {!subscription.cancelAtPeriodEnd && (
              <Button variant="ghost" size="sm">
                Cancel Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
          <CardDescription>Track your current usage against plan limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Domains Monitored</span>
                <span>
                  {subscription.usage.domains} /{" "}
                  {currentPlan?.limits.domains === -1 ? "∞" : currentPlan?.limits.domains}
                </span>
              </div>
              <Progress value={usagePercentages.domains} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Alerts Sent</span>
                <span>
                  {subscription.usage.alerts} / {currentPlan?.limits.alerts === -1 ? "∞" : currentPlan?.limits.alerts}
                </span>
              </div>
              <Progress value={usagePercentages.alerts} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Bot Commands</span>
                <span>
                  {subscription.usage.botCommands} /{" "}
                  {currentPlan?.limits.botCommands === -1 ? "∞" : currentPlan?.limits.botCommands}
                </span>
              </div>
              <Progress value={usagePercentages.botCommands} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>API Calls</span>
                <span>
                  {subscription.usage.apiCalls} /{" "}
                  {currentPlan?.limits.apiCalls === -1 ? "∞" : currentPlan?.limits.apiCalls}
                </span>
              </div>
              <Progress value={usagePercentages.apiCalls} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {billingHistory.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{invoice.description}</p>
                  <p className="text-sm text-muted-foreground">{new Date(invoice.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">${invoice.amount}</span>
                  <Badge variant={invoice.status === "paid" ? "default" : "destructive"}>{invoice.status}</Badge>
                  {invoice.invoiceUrl && (
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
