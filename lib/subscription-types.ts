export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: "month" | "year"
  features: string[]
  limits: {
    domains: number
    alerts: number
    botCommands: number
    apiCalls: number
    storage: string
  }
  popular?: boolean
}

export interface UserSubscription {
  id: string
  userId: string
  planId: string
  status: "active" | "canceled" | "past_due" | "trialing"
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  usage: {
    domains: number
    alerts: number
    botCommands: number
    apiCalls: number
  }
}

export interface BillingHistory {
  id: string
  amount: number
  currency: string
  status: "paid" | "pending" | "failed"
  date: string
  description: string
  invoiceUrl?: string
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month",
    features: [
      "Monitor up to 10 domains",
      "Basic email alerts",
      "100 bot commands/month",
      "Community support",
      "Basic domain search",
    ],
    limits: {
      domains: 10,
      alerts: 50,
      botCommands: 100,
      apiCalls: 1000,
      storage: "100MB",
    },
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    interval: "month",
    features: [
      "Monitor up to 500 domains",
      "Real-time alerts (Email, SMS, Telegram)",
      "Unlimited bot commands",
      "Priority support",
      "Advanced domain analytics",
      "Price drop notifications",
      "Bulk domain import",
      "API access",
    ],
    limits: {
      domains: 500,
      alerts: 5000,
      botCommands: -1, // unlimited
      apiCalls: 50000,
      storage: "5GB",
    },
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    interval: "month",
    features: [
      "Unlimited domain monitoring",
      "Custom alert rules",
      "Unlimited bot commands",
      "Dedicated support",
      "Advanced analytics & reporting",
      "Custom integrations",
      "White-label options",
      "SLA guarantee",
      "Doma Protocol premium features",
      "Multi-user team management",
    ],
    limits: {
      domains: -1, // unlimited
      alerts: -1, // unlimited
      botCommands: -1, // unlimited
      apiCalls: -1, // unlimited
      storage: "Unlimited",
    },
  },
]
