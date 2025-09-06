export interface AlertRule {
  id: string
  name: string
  description: string
  isActive: boolean
  domains: string[] // specific domains or patterns
  triggers: AlertTrigger[]
  channels: NotificationChannel[]
  frequency: AlertFrequency
  createdAt: string
  lastTriggered?: string
}

export interface AlertTrigger {
  type: "expiration" | "price_drop" | "price_increase" | "availability" | "transfer" | "dns_change"
  conditions: Record<string, any>
  priority: "low" | "medium" | "high" | "critical"
}

export interface NotificationChannel {
  type: "email" | "sms" | "telegram" | "twitter" | "webhook"
  config: Record<string, any>
  isEnabled: boolean
}

export interface AlertFrequency {
  type: "immediate" | "hourly" | "daily" | "weekly"
  maxPerDay?: number
  quietHours?: { start: string; end: string }
}

export interface AlertHistory {
  id: string
  ruleId: string
  ruleName: string
  domain: string
  triggerType: string
  priority: "low" | "medium" | "high" | "critical"
  message: string
  channels: string[]
  status: "sent" | "failed" | "pending"
  timestamp: string
  details?: Record<string, any>
}

export const ALERT_TEMPLATES = {
  expiration: {
    name: "Domain Expiration Alert",
    description: "Alert when domains are approaching expiration",
    defaultTrigger: {
      type: "expiration" as const,
      conditions: { daysBeforeExpiry: 30 },
      priority: "high" as const,
    },
  },
  price_drop: {
    name: "Price Drop Alert",
    description: "Alert when domain prices decrease",
    defaultTrigger: {
      type: "price_drop" as const,
      conditions: { percentageDecrease: 10 },
      priority: "medium" as const,
    },
  },
  availability: {
    name: "Domain Available Alert",
    description: "Alert when watched domains become available",
    defaultTrigger: {
      type: "availability" as const,
      conditions: {},
      priority: "high" as const,
    },
  },
}
