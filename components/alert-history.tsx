"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, CheckCircle, AlertTriangle, Clock, Search } from "lucide-react"
import type { AlertHistory } from "@/lib/alert-types"

export function AlertHistoryComponent() {
  const [alerts, setAlerts] = useState<AlertHistory[]>([])
  const [filteredAlerts, setFilteredAlerts] = useState<AlertHistory[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Mock data for demonstration
  useEffect(() => {
    const mockAlerts: AlertHistory[] = [
      {
        id: "1",
        ruleId: "rule_1",
        ruleName: "Domain Expiration Alert",
        domain: "example.com",
        triggerType: "expiration",
        priority: "critical",
        message: "Domain example.com expires in 7 days",
        channels: ["email", "telegram"],
        status: "sent",
        timestamp: "2024-03-15T10:30:00Z",
      },
      {
        id: "2",
        ruleId: "rule_2",
        ruleName: "Price Drop Alert",
        domain: "mystore.net",
        triggerType: "price_drop",
        priority: "medium",
        message: "Price for mystore.net dropped by 15% to $125",
        channels: ["email"],
        status: "sent",
        timestamp: "2024-03-15T09:45:00Z",
      },
      {
        id: "3",
        ruleId: "rule_3",
        ruleName: "Domain Available Alert",
        domain: "newdomain.org",
        triggerType: "availability",
        priority: "high",
        message: "Domain newdomain.org is now available for registration",
        channels: ["telegram", "twitter"],
        status: "failed",
        timestamp: "2024-03-15T08:20:00Z",
      },
      {
        id: "4",
        ruleId: "rule_1",
        ruleName: "Domain Expiration Alert",
        domain: "testsite.com",
        triggerType: "expiration",
        priority: "high",
        message: "Domain testsite.com expires in 30 days",
        channels: ["email"],
        status: "pending",
        timestamp: "2024-03-15T07:15:00Z",
      },
    ]

    setAlerts(mockAlerts)
    setFilteredAlerts(mockAlerts)
  }, [])

  // Filter alerts based on search and filters
  useEffect(() => {
    let filtered = alerts

    if (searchQuery) {
      filtered = filtered.filter(
        (alert) =>
          alert.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alert.ruleName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((alert) => alert.status === statusFilter)
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((alert) => alert.priority === priorityFilter)
    }

    setFilteredAlerts(filtered)
  }, [alerts, searchQuery, statusFilter, priorityFilter])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "default"
      case "failed":
        return "destructive"
      case "pending":
        return "secondary"
      default:
        return "outline"
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

  const getChannelBadges = (channels: string[]) => {
    return channels.map((channel) => (
      <Badge key={channel} variant="outline" className="text-xs">
        {channel}
      </Badge>
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Alert History
        </CardTitle>
        <CardDescription>View and manage your recent alert notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Alert List */}
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex items-start gap-4 flex-1">
                {getStatusIcon(alert.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{alert.domain}</p>
                    <Badge variant={getPriorityColor(alert.priority)} className="text-xs">
                      {alert.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{alert.ruleName}</span>
                    <span>•</span>
                    <span>{new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <Badge variant={getStatusColor(alert.status)}>{alert.status}</Badge>
                <div className="flex gap-1">{getChannelBadges(alert.channels)}</div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No alerts match your current filters</p>
          </div>
        )}

        {/* Pagination could go here */}
        <div className="flex justify-center pt-4">
          <Button variant="outline">Load More</Button>
        </div>
      </CardContent>
    </Card>
  )
}
