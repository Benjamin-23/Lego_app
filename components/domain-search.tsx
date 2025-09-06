"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Eye, Calendar, DollarSign } from "lucide-react"

interface DomainResult {
  name: string
  status: "available" | "taken" | "expiring" | "auction"
  price?: number
  expiryDate?: string
  registrar?: string
}

export function DomainSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<DomainResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const mockSearch = async (query: string) => {
    setIsSearching(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockResults: DomainResult[] = [
      { name: `${query}.com`, status: "taken", expiryDate: "2024-12-15", registrar: "GoDaddy" },
      { name: `${query}.org`, status: "available", price: 12.99 },
      { name: `${query}.net`, status: "expiring", expiryDate: "2024-04-20", price: 89.99 },
      { name: `${query}app.com`, status: "auction", price: 250.0 },
      { name: `get${query}.com`, status: "available", price: 15.99 },
    ]

    setSearchResults(mockResults)
    setIsSearching(false)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      mockSearch(searchQuery.trim())
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "taken":
        return "bg-gray-500"
      case "expiring":
        return "bg-yellow-500"
      case "auction":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Domain Search</CardTitle>
        <CardDescription>Search for domains and check availability</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter domain name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={isSearching}>
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {isSearching && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">Searching domains...</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Search Results</h4>
            {searchResults.map((domain, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${getStatusColor(domain.status)}`}></div>
                  <div>
                    <p className="font-medium">{domain.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {domain.status}
                      </Badge>
                      {domain.expiryDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {domain.expiryDate}
                        </span>
                      )}
                      {domain.price && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />${domain.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button size="sm">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
