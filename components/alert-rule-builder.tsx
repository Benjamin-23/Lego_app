"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X, Bell, Mail, MessageSquare, Twitter, Webhook } from "lucide-react"
import { ALERT_TEMPLATES, type AlertRule, type NotificationChannel } from "@/lib/alert-types"

interface AlertRuleBuilderProps {
  rule?: AlertRule
  onSave?: (rule: Partial<AlertRule>) => void
  onCancel?: () => void
}

export function AlertRuleBuilder({ rule, onSave, onCancel }: AlertRuleBuilderProps) {
  const [formData, setFormData] = useState<Partial<AlertRule>>({
    name: rule?.name || "",
    description: rule?.description || "",
    isActive: rule?.isActive ?? true,
    domains: rule?.domains || [],
    triggers: rule?.triggers || [],
    channels: rule?.channels || [],
    frequency: rule?.frequency || { type: "immediate" },
  })

  const [newDomain, setNewDomain] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")

  const addDomain = () => {
    if (newDomain.trim() && !formData.domains?.includes(newDomain.trim())) {
      setFormData((prev) => ({
        ...prev,
        domains: [...(prev.domains || []), newDomain.trim()],
      }))
      setNewDomain("")
    }
  }

  const removeDomain = (domain: string) => {
    setFormData((prev) => ({
      ...prev,
      domains: prev.domains?.filter((d) => d !== domain) || [],
    }))
  }

  const addTriggerFromTemplate = (templateKey: string) => {
    const template = ALERT_TEMPLATES[templateKey as keyof typeof ALERT_TEMPLATES]
    if (template) {
      setFormData((prev) => ({
        ...prev,
        triggers: [...(prev.triggers || []), template.defaultTrigger],
      }))
    }
  }

  const removeTrigger = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      triggers: prev.triggers?.filter((_, i) => i !== index) || [],
    }))
  }

  const addNotificationChannel = (type: NotificationChannel["type"]) => {
    const newChannel: NotificationChannel = {
      type,
      config: {},
      isEnabled: true,
    }
    setFormData((prev) => ({
      ...prev,
      channels: [...(prev.channels || []), newChannel],
    }))
  }

  const removeChannel = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels?.filter((_, i) => i !== index) || [],
    }))
  }

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      case "telegram":
        return <MessageSquare className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "webhook":
        return <Webhook className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{rule ? "Edit Alert Rule" : "Create Alert Rule"}</CardTitle>
        <CardDescription>Set up automated alerts for domain monitoring events</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="triggers">Triggers</TabsTrigger>
            <TabsTrigger value="channels">Notifications</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="rule-name">Rule Name</Label>
                <Input
                  id="rule-name"
                  placeholder="e.g., Critical Domain Expiration Alert"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rule-description">Description</Label>
                <Textarea
                  id="rule-description"
                  placeholder="Describe when this alert should trigger..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="rule-active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="rule-active">Active</Label>
              </div>

              <div className="space-y-2">
                <Label>Monitored Domains</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="example.com or *.example.com"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addDomain()}
                  />
                  <Button onClick={addDomain}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.domains?.map((domain) => (
                    <Badge key={domain} variant="secondary" className="flex items-center gap-1">
                      {domain}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeDomain(domain)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="triggers" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Quick Templates</Label>
                <div className="grid gap-2 mt-2">
                  {Object.entries(ALERT_TEMPLATES).map(([key, template]) => (
                    <Button
                      key={key}
                      variant="outline"
                      className="justify-start bg-transparent"
                      onClick={() => addTriggerFromTemplate(key)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {template.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Active Triggers</Label>
                <div className="space-y-2 mt-2">
                  {formData.triggers?.map((trigger, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium capitalize">{trigger.type.replace("_", " ")}</p>
                        <p className="text-sm text-muted-foreground">{JSON.stringify(trigger.conditions)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(trigger.priority)}>{trigger.priority}</Badge>
                        <Button variant="ghost" size="sm" onClick={() => removeTrigger(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="channels" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Add Notification Channel</Label>
                <div className="grid gap-2 mt-2 md:grid-cols-2">
                  <Button variant="outline" onClick={() => addNotificationChannel("email")}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" onClick={() => addNotificationChannel("telegram")}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Telegram
                  </Button>
                  <Button variant="outline" onClick={() => addNotificationChannel("twitter")}>
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" onClick={() => addNotificationChannel("webhook")}>
                    <Webhook className="h-4 w-4 mr-2" />
                    Webhook
                  </Button>
                </div>
              </div>

              <div>
                <Label>Active Channels</Label>
                <div className="space-y-2 mt-2">
                  {formData.channels?.map((channel, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getChannelIcon(channel.type)}
                        <span className="capitalize">{channel.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={channel.isEnabled}
                          onCheckedChange={(checked) => {
                            const newChannels = [...(formData.channels || [])]
                            newChannels[index] = { ...channel, isEnabled: checked }
                            setFormData((prev) => ({ ...prev, channels: newChannels }))
                          }}
                        />
                        <Button variant="ghost" size="sm" onClick={() => removeChannel(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Alert Frequency</Label>
                <Select
                  value={formData.frequency?.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      frequency: { ...prev.frequency, type: value as any },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Max Alerts Per Day</Label>
                <Input
                  type="number"
                  placeholder="10"
                  value={formData.frequency?.maxPerDay || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      frequency: {
                        ...prev.frequency,
                        maxPerDay: Number.parseInt(e.target.value) || undefined,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-6">
          <Button onClick={() => onSave?.(formData)}>{rule ? "Update Rule" : "Create Rule"}</Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
