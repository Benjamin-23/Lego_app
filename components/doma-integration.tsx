"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { domaClient, type OnChainDomain, type DomainEvent } from "@/lib/doma-client"
import { Coins, Link, Activity, CheckCircle, AlertCircle, Clock, ExternalLink } from "lucide-react"

export function DomaIntegration() {
  const [selectedDomain, setSelectedDomain] = useState("")
  const [onChainDomains, setOnChainDomains] = useState<OnChainDomain[]>([])
  const [recentEvents, setRecentEvents] = useState<DomainEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [registrationForm, setRegistrationForm] = useState({
    domain: "",
    registrant: "",
    duration: 1,
    tokenize: false,
    network:'testnet',
    price:0
  })

  // Mock data for demonstration
  useEffect(() => {
    const mockDomains: OnChainDomain[] = [
      {
        id: "1",
        domain: "example.com",
        owner: "0x1234...5678",
        tokenId: "NFT-001",
        isTokenized: true,
        expiryDate: "2025-04-15",
        registrar: "Doma Protocol",
        lastSync: "2024-03-15T10:30:00Z",
        onChainStatus: "active",
      },
      {
        id: "2",
        domain: "mystore.net",
        owner: "0x8765...4321",
        isTokenized: false,
        expiryDate: "2024-12-20",
        registrar: "Doma Protocol",
        lastSync: "2024-03-15T09:15:00Z",
        onChainStatus: "active",
      },
    ]

    const mockEvents: DomainEvent[] = [
      {
        id: "1",
        domain: "example.com",
        eventType: "tokenization",
        timestamp: "2024-03-15T10:30:00Z",
        details: { tokenId: "NFT-001", owner: "0x1234...5678" },
        txHash: "0xabc123...def456",
      },
      {
        id: "2",
        domain: "newdomain.org",
        eventType: "registration",
        timestamp: "2024-03-15T09:45:00Z",
        details: { registrant: "0x9876...5432", duration: 2 },
        txHash: "0x789xyz...123abc",
      },
    ]

    setOnChainDomains(mockDomains)
    setRecentEvents(mockEvents)
  }, [])

  const handleRegisterDomain = async () => {
    setIsLoading(true)
    try {
      const result = await domaClient.registerDomain(registrationForm)
      if (result.success) {
        // Refresh domains list
        console.log("Domain registered successfully:", result.txHash)
      } else {
        console.error("Registration failed:", result.error)
      }
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTokenizeDomain = async (domain: string) => {
    setIsLoading(true)
    try {
      const result = await domaClient.tokenizeDomain(domain)
      if (result.success) {
        console.log("Domain tokenized successfully:", result.tokenId)
        // Update local state
        setOnChainDomains((prev) =>
          prev.map((d) => (d.domain === domain ? { ...d, isTokenized: true, tokenId: result.tokenId } : d)),
        )
      } else {
        console.error("Tokenization failed:", result.error)
      }
    } catch (error) {
      console.error("Tokenization error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "expired":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "tokenization":
        return <Coins className="h-4 w-4 text-blue-500" />
      case "registration":
        return <Link className="h-4 w-4 text-green-500" />
      case "transfer":
        return <ExternalLink className="h-4 w-4 text-purple-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Doma Protocol Integration
          </CardTitle>
          <CardDescription>Manage on-chain domains, tokenization, and real-time synchronization</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="domains" className="space-y-4">
            <TabsList>
              <TabsTrigger value="domains">On-Chain Domains</TabsTrigger>
              <TabsTrigger value="register">Register Domain</TabsTrigger>
              <TabsTrigger value="events">Recent Events</TabsTrigger>
            </TabsList>

            <TabsContent value="domains" className="space-y-4">
              <div className="space-y-3">
                {onChainDomains.map((domain) => (
                  <div key={domain.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(domain.onChainStatus)}
                      <div>
                        <p className="font-medium">{domain.domain}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Owner: {domain.owner}</span>
                          <span>Expires: {domain.expiryDate}</span>
                          {domain.tokenId && <span>Token: {domain.tokenId}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {domain.isTokenized ? (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Coins className="h-3 w-3" />
                          Tokenized
                        </Badge>
                      ) : (
                        <Button size="sm" onClick={() => handleTokenizeDomain(domain.domain)} disabled={isLoading}>
                          <Coins className="h-3 w-3 mr-1" />
                          Tokenize
                        </Button>
                      )}

                      <Badge variant="outline">{domain.onChainStatus}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain Name</Label>
                  <Input
                    id="domain"
                    placeholder="example.com"
                    value={registrationForm.domain}
                    onChange={(e) => setRegistrationForm((prev) => ({ ...prev, domain: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrant">Registrant Address</Label>
                  <Input
                    id="registrant"
                    placeholder="0x..."
                    value={registrationForm.registrant}
                    onChange={(e) => setRegistrationForm((prev) => ({ ...prev, registrant: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (years)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="10"
                    value={registrationForm.duration}
                    onChange={(e) =>
                      setRegistrationForm((prev) => ({ ...prev, duration: Number.parseInt(e.target.value) }))
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="tokenize"
                    checked={registrationForm.tokenize}
                    onCheckedChange={(checked) => setRegistrationForm((prev) => ({ ...prev, tokenize: checked }))}
                  />
                  <Label htmlFor="tokenize">Tokenize on registration</Label>
                </div>
              </div>

              <Button
                onClick={handleRegisterDomain}
                disabled={isLoading || !registrationForm.domain || !registrationForm.registrant}
                className="w-full"
              >
                {isLoading ? "Registering..." : "Register Domain"}
              </Button>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="space-y-3">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getEventIcon(event.eventType)}
                      <div>
                        <p className="font-medium">{event.domain}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {event.eventType.replace("_", " ")} event
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium">{new Date(event.timestamp).toLocaleString()}</p>
                      {event.txHash && (
                        <p className="text-xs text-muted-foreground">Tx: {event.txHash.slice(0, 10)}...</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
