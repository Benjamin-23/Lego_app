"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Bot, Globe, Settings, TrendingUp, Users, Zap, Link } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Lego Bot</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-sidebar-border bg-sidebar p-6">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground"
              onClick={() => (window.location.href = "/domains")}
            >
              <Globe className="h-4 w-4" />
              Domain Monitor
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground"
              onClick={() => (window.location.href = "/doma")}
            >
              <Link className="h-4 w-4" />
              Doma Protocol
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground">
              <Bot className="h-4 w-4" />
              Bot Management
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground"
              onClick={() => (window.location.href = "/alerts")}
            >
              <Bell className="h-4 w-4" />
              Alerts
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground"
              onClick={() => (window.location.href = "/subscriptions")}
            >
              <Users className="h-4 w-4" />
              Subscriptions
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground"
              onClick={() => (window.location.href = "/community")}
            >
              <Users className="h-4 w-4" />
              Community
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Domain Alert Dashboard</h2>
            <p className="text-muted-foreground">Monitor domains, manage alerts, and engage your community</p>
          </div>

          {/* Stats Cards */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Domains</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alerts Sent</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,892</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bot Interactions</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,234</div>
                <p className="text-xs text-muted-foreground">+23% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,847</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Domain Alerts</CardTitle>
                <CardDescription>Latest domain events and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">example.com</p>
                    <p className="text-sm text-muted-foreground">Expiring in 7 days</p>
                  </div>
                  <Badge variant="destructive">Critical</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">mysite.org</p>
                    <p className="text-sm text-muted-foreground">Price drop detected</p>
                  </div>
                  <Badge variant="secondary">Opportunity</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">newdomain.net</p>
                    <p className="text-sm text-muted-foreground">Available for registration</p>
                  </div>
                  <Badge>Available</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Bot Status */}
            <Card>
              <CardHeader>
                <CardTitle>Bot Status</CardTitle>
                <CardDescription>Monitor your Telegram and Twitter bots</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Telegram Bot</span>
                  </div>
                  <Badge variant="secondary">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Twitter Bot</span>
                  </div>
                  <Badge variant="secondary">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Doma Integration</span>
                  </div>
                  <Badge>Connected</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with Lego Bot features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button className="h-20 flex-col gap-2">
                  <Zap className="h-5 w-5" />
                  Setup Domain Monitor
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Bot className="h-5 w-5" />
                  Configure Bots
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Users className="h-5 w-5" />
                  Manage Subscriptions
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
