"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Check, Star, Zap, Users, Crown } from "lucide-react"
import { SUBSCRIPTION_PLANS } from "@/lib/subscription-types"

interface SubscriptionPlansProps {
  currentPlanId?: string
  onSelectPlan?: (planId: string) => void
}

export function SubscriptionPlans({ currentPlanId, onSelectPlan }: SubscriptionPlansProps) {
  const [isYearly, setIsYearly] = useState(false)

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "free":
        return <Zap className="h-5 w-5" />
      case "pro":
        return <Star className="h-5 w-5" />
      case "enterprise":
        return <Crown className="h-5 w-5" />
      default:
        return <Users className="h-5 w-5" />
    }
  }

  const formatLimit = (limit: number, unit: string) => {
    if (limit === -1) return "Unlimited"
    return `${limit.toLocaleString()} ${unit}`
  }

  const getYearlyPrice = (monthlyPrice: number) => {
    return Math.floor(monthlyPrice * 12 * 0.8) // 20% discount for yearly
  }

  return (
    <div className="space-y-6">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <Label htmlFor="billing-toggle" className={!isYearly ? "font-medium" : ""}>
          Monthly
        </Label>
        <Switch id="billing-toggle" checked={isYearly} onCheckedChange={setIsYearly} />
        <Label htmlFor="billing-toggle" className={isYearly ? "font-medium" : ""}>
          Yearly
          <Badge variant="secondary" className="ml-2">
            Save 20%
          </Badge>
        </Label>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrentPlan = currentPlanId === plan.id
          const displayPrice = isYearly && plan.price > 0 ? getYearlyPrice(plan.price) : plan.price
          const priceLabel = isYearly ? "/year" : "/month"

          return (
            <Card
              key={plan.id}
              className={`relative ${plan.popular ? "border-primary shadow-lg" : ""} ${isCurrentPlan ? "ring-2 ring-primary" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">{getPlanIcon(plan.id)}</div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-foreground">${displayPrice}</span>
                  {plan.price > 0 && <span className="text-muted-foreground">{priceLabel}</span>}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features List */}
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Usage Limits */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-sm mb-2">Usage Limits</h4>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Domains:</span>
                      <span>{formatLimit(plan.limits.domains, "")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Alerts:</span>
                      <span>{formatLimit(plan.limits.alerts, "/month")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bot Commands:</span>
                      <span>{formatLimit(plan.limits.botCommands, "/month")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage:</span>
                      <span>{plan.limits.storage}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full mt-6"
                  variant={isCurrentPlan ? "outline" : plan.popular ? "default" : "outline"}
                  onClick={() => onSelectPlan?.(plan.id)}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? "Current Plan" : `Choose ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
