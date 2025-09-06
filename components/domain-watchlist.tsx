"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Bell, Calendar, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react"

interface WatchedDomain {
  id: string
  name: string
  status: "monitored" | "expiring" | "price-drop" | "available"
  currentPrice: number
  targetPrice?: number
  expiryDate: string
  lastChecked: string
  priceChange: number
}

export function DomainWatchlist() {
  const [watchedDomains] = useState<WatchedDomain[]>([
    {
      id: "1",
      name: "example.com",
      status: "expiring",
      currentPrice: 89.99,
      targetPrice: 50.0,
      expiryDate: "2024-04-15",
      lastChecked: "2 min ago",
      priceChange: -5.0,
    },
    {
      id: "2",
      name: "mystore.net",
      status: "price-drop",
      currentPrice: 125.0,
      targetPrice: 100.0,
      expiryDate: "2025-01-20",
      lastChecked: "5 min ago",
      priceChange: -25.0,
    },
    {
      id: "3",
      name: "newapp.org",
      status: "monitored",
      currentPrice: 15.99,
      expiryDate: "2024-12-30",
      lastChecked: "1 min ago",
      priceChange: 2.0,
    },
  ])

  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "expiring":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "price-drop":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      case "available":
        return <Bell className="h-4 w-4 text-blue-500" />
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "expiring":
        return "destructive"
      case "price-drop":
        return "default"
      case "available":
        return "secondary"
      default:
        return "outline"
    }
  }

  const filteredDomains = watchedDomains.filter((domain) => filterStatus === "all" || domain.status === filterStatus)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Domain Watchlist</CardTitle>
        <CardDescription>Monitor your tracked domains for changes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex gap-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="monitored">Monitored</SelectItem>
              <SelectItem value="expiring">Expiring</SelectItem>
              <SelectItem value="price-drop">Price Drop</SelectItem>
              <SelectItem value="available">Available</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="expiry">Expiry Date</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Domain List */}
        <div className="space-y-3">
          {filteredDomains.map((domain) => (
            <div key={domain.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                {getStatusIcon(domain.status)}
                <div>
                  <p className="font-medium">{domain.name}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Expires: {domain.expiryDate}</span>
                    <span>Last checked: {domain.lastChecked}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">${domain.currentPrice}</p>
                  <div className="flex items-center gap-1 text-sm">
                    {domain.priceChange > 0 ? (
                      <TrendingUp className="h-3 w-3 text-red-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-green-500" />
                    )}
                    <span className={domain.priceChange > 0 ? "text-red-500" : "text-green-500"}>
                      ${Math.abs(domain.priceChange)}
                    </span>
                  </div>
                </div>

                <Badge variant={getStatusColor(domain.status)}>{domain.status}</Badge>

                <Button size="sm" variant="ghost">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredDomains.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No domains match your current filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
