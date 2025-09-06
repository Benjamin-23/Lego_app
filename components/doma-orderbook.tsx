"use client"

import { useState, useEffect, SetStateAction } from "react"
import { useAccount, useWalletClient, usePublicClient } from "wagmi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { domaOrderbook, type DomainListing, type DomainOffer, type TradeTransaction } from "@/lib/doma-orderbook-sdk"
import { WalletConnection } from "@/components/wallet-connection"
import {
  ShoppingCart,
  Tag,
  Gavel,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  ExternalLink,
  AlertTriangle,
} from "lucide-react"
import { parseEther } from "viem"

export function DomaOrderbook() {
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  const [activeListings, setActiveListings] = useState<DomainListing[]>([])
  const [pendingOffers, setPendingOffers] = useState<DomainOffer[]>([])
  const [recentTrades, setRecentTrades] = useState<TradeTransaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentOperation, setCurrentOperation] = useState("")

  // Form states
  const [listingForm, setListingForm] = useState({
    domain: "",
    tokenId: "",
    price: "",
    currency: "0x0",
    duration: "30",
  })

  const [offerForm, setOfferForm] = useState({
    domain: "",
    tokenId: "",
    amount: "",
    currency: "0x0",
    duration: "7",
  })

  useEffect(() => {
    if (walletClient && publicClient) {
      domaOrderbook.setWalletClient(walletClient)
      domaOrderbook.setPublicClient(publicClient)
    }
  }, [walletClient, publicClient])

  useEffect(() => {
    const mockListings: DomainListing[] = [
      {
        id: "listing-1",
        domain: "premium.eth",
        tokenId: "NFT-001",
        seller: "0x1234...5678" as any,
        price: parseEther("5.5"),
        currency: "0x0" as any,
        expiresAt: Math.floor(Date.now() / 1000) + 86400 * 15,
        status: "active",
        createdAt: "2024-03-15T10:30:00Z",
        marketplaceFee: parseEther("0.1375"),
      },
      {
        id: "listing-2",
        domain: "crypto-store.com",
        tokenId: "NFT-002",
        seller: "0x8765...4321" as any,
        price: parseEther("2.8"),
        currency: "0x0" as any,
        expiresAt: Math.floor(Date.now() / 1000) + 86400 * 7,
        status: "active",
        createdAt: "2024-03-14T15:20:00Z",
        marketplaceFee: parseEther("0.07"),
      },
    ]

    const mockOffers: DomainOffer[] = [
      {
        id: "offer-1",
        domain: "example.com",
        tokenId: "NFT-003",
        buyer: "0x9876...5432" as any,
        amount: parseEther("3.2"),
        currency: "0x0" as any,
        expiresAt: Math.floor(Date.now() / 1000) + 86400 * 3,
        status: "pending",
        createdAt: "2024-03-15T09:15:00Z",
      },
    ]

    const mockTrades: TradeTransaction[] = [
      {
        hash: "0xabc123...def456" as any,
        type: "purchase",
        domain: "web3-domain.eth",
        amount: parseEther("4.2"),
        currency: "0x0" as any,
        from: "0x1111...2222" as any,
        to: "0x3333...4444" as any,
        status: "confirmed",
        timestamp: "2024-03-15T08:45:00Z",
        gasUsed: BigInt("21000"),
        marketplaceFee: parseEther("0.105"),
      },
    ]

    setActiveListings(mockListings)
    setPendingOffers(mockOffers)
    setRecentTrades(mockTrades)
  }, [])

  const handleCreateListing = async () => {
    if (!listingForm.domain || !listingForm.tokenId || !listingForm.price) return
    if (!isConnected) return

    setIsLoading(true)
    setProgress(0)
    setCurrentOperation("Creating listing...")

    try {
      const result = await domaOrderbook.createListing(
        listingForm.domain,
        listingForm.tokenId,
        parseEther(listingForm.price),
        listingForm.currency as any,
        Number.parseInt(listingForm.duration),
        {
          onProgress: (step: SetStateAction<string>, prog: SetStateAction<number>) => {
            setCurrentOperation(step)
            setProgress(prog)
          },
        },
      )

      if (result.success) {
        // Refresh listings
        const listings = await domaOrderbook.getListings()
        setActiveListings(listings)
        setListingForm({ domain: "", tokenId: "", price: "", currency: "0x0", duration: "30" })
      }
    } catch (error) {
      console.error("Listing creation failed:", error)
    } finally {
      setIsLoading(false)
      setProgress(0)
      setCurrentOperation("")
    }
  }

  const handleCreateOffer = async () => {
    if (!offerForm.domain || !offerForm.tokenId || !offerForm.amount) return
    if (!isConnected) return

    setIsLoading(true)
    setProgress(0)
    setCurrentOperation("Creating offer...")

    try {
      const result = await domaOrderbook.createOffer(
        offerForm.domain,
        offerForm.tokenId,
        parseEther(offerForm.amount),
        offerForm.currency as any,
        Number.parseInt(offerForm.duration),
        {
          onProgress: (step: SetStateAction<string>, prog: SetStateAction<number>) => {
            setCurrentOperation(step)
            setProgress(prog)
          },
        },
      )

      if (result.success) {
        // Refresh offers
        const offers = await domaOrderbook.getOffers()
        setPendingOffers(offers)
        setOfferForm({ domain: "", tokenId: "", amount: "", currency: "0x0", duration: "7" })
      }
    } catch (error) {
      console.error("Offer creation failed:", error)
    } finally {
      setIsLoading(false)
      setProgress(0)
      setCurrentOperation("")
    }
  }

  const handleBuyListing = async (listingId: string) => {
    if (!isConnected) return

    setIsLoading(true)
    setProgress(0)
    setCurrentOperation("Processing purchase...")

    try {
      const result = await domaOrderbook.buyListing(listingId, {
        onProgress: (step:any, prog:any) => {
          setCurrentOperation(step)
          setProgress(prog)
        },
      })

      if (result.success) {
        // Refresh listings
        const listings = await domaOrderbook.getListings()
        setActiveListings(listings)
      }
    } catch (error) {
      console.error("Purchase failed:", error)
    } finally {
      setIsLoading(false)
      setProgress(0)
      setCurrentOperation("")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "confirmed":
      case "sold":
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
      case "rejected":
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const formatTimeRemaining = (expiresAt: number) => {
    const now = Math.floor(Date.now() / 1000)
    const remaining = expiresAt - now
    if (remaining <= 0) return "Expired"

    const days = Math.floor(remaining / 86400)
    const hours = Math.floor((remaining % 86400) / 3600)

    if (days > 0) return `${days}d ${hours}h`
    return `${hours}h`
  }

  return (
    <div className="space-y-6">
      {!isConnected && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <div>
                <p className="font-medium text-amber-800">Wallet Connection Required</p>
                <p className="text-sm text-amber-700">Connect your wallet to start trading domains on the orderbook.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <WalletConnection />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Doma Orderbook
            {isConnected && (
              <Badge variant="outline" className="ml-auto">
                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                Connected
              </Badge>
            )}
          </CardTitle>
          <CardDescription>Trade tokenized domains with listings, offers, and automated transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress indicator */}
          {isLoading && (
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">{currentOperation}</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          <Tabs defaultValue="marketplace" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="create-listing" disabled={!isConnected}>
                Create Listing
              </TabsTrigger>
              <TabsTrigger value="offers" disabled={!isConnected}>
                Offers
              </TabsTrigger>
              <TabsTrigger value="trades">Recent Trades</TabsTrigger>
            </TabsList>

            <TabsContent value="marketplace" className="space-y-4">
              <div className="space-y-3">
                {activeListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Tag className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{listing.domain}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Price: {domaOrderbook.formatPrice(listing.price, listing.currency)}</span>
                          <span>Fee: {domaOrderbook.formatPrice(listing.marketplaceFee, listing.currency)}</span>
                          <span>Expires: {formatTimeRemaining(listing.expiresAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getStatusIcon(listing.status)}
                        {listing.status}
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => handleBuyListing(listing.id)}
                        disabled={isLoading || listing.status !== "active" || !isConnected}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="create-listing" className="space-y-4">
              {!isConnected ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Connect your wallet to create listings</p>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="listing-domain">Domain Name</Label>
                      <Input
                        id="listing-domain"
                        placeholder="example.com"
                        value={listingForm.domain}
                        onChange={(e) => setListingForm((prev) => ({ ...prev, domain: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="listing-token">Token ID</Label>
                      <Input
                        id="listing-token"
                        placeholder="NFT-001"
                        value={listingForm.tokenId}
                        onChange={(e) => setListingForm((prev) => ({ ...prev, tokenId: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="listing-price">Price (ETH)</Label>
                      <Input
                        id="listing-price"
                        type="number"
                        step="0.01"
                        placeholder="5.0"
                        value={listingForm.price}
                        onChange={(e) => setListingForm((prev) => ({ ...prev, price: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="listing-currency">Currency</Label>
                      <Select
                        value={listingForm.currency}
                        onValueChange={(value) => setListingForm((prev) => ({ ...prev, currency: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0x0">ETH</SelectItem>
                          <SelectItem value="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2">WETH</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="listing-duration">Duration (days)</Label>
                      <Input
                        id="listing-duration"
                        type="number"
                        min="1"
                        max="365"
                        value={listingForm.duration}
                        onChange={(e) => setListingForm((prev) => ({ ...prev, duration: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleCreateListing}
                    disabled={isLoading || !listingForm.domain || !listingForm.tokenId || !listingForm.price}
                    className="w-full"
                  >
                    {isLoading ? "Creating Listing..." : "Create Listing"}
                  </Button>
                </>
              )}
            </TabsContent>

            <TabsContent value="offers" className="space-y-4">
              {!isConnected ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Connect your wallet to create and manage offers</p>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 md:grid-cols-2 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="offer-domain">Domain Name</Label>
                      <Input
                        id="offer-domain"
                        placeholder="example.com"
                        value={offerForm.domain}
                        onChange={(e) => setOfferForm((prev) => ({ ...prev, domain: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="offer-token">Token ID</Label>
                      <Input
                        id="offer-token"
                        placeholder="NFT-001"
                        value={offerForm.tokenId}
                        onChange={(e) => setOfferForm((prev) => ({ ...prev, tokenId: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="offer-amount">Offer Amount (ETH)</Label>
                      <Input
                        id="offer-amount"
                        type="number"
                        step="0.01"
                        placeholder="3.0"
                        value={offerForm.amount}
                        onChange={(e) => setOfferForm((prev) => ({ ...prev, amount: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="offer-duration">Duration (days)</Label>
                      <Input
                        id="offer-duration"
                        type="number"
                        min="1"
                        max="30"
                        value={offerForm.duration}
                        onChange={(e) => setOfferForm((prev) => ({ ...prev, duration: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleCreateOffer}
                    disabled={isLoading || !offerForm.domain || !offerForm.tokenId || !offerForm.amount}
                    className="w-full mb-6"
                  >
                    {isLoading ? "Creating Offer..." : "Create Offer"}
                  </Button>

                  <div className="space-y-3">
                    {pendingOffers.map((offer) => (
                      <div key={offer.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Gavel className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{offer.domain}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Offer: {domaOrderbook.formatPrice(offer.amount, offer.currency)}</span>
                              <span>
                                From: {offer.buyer.slice(0, 6)}...{offer.buyer.slice(-4)}
                              </span>
                              <span>Expires: {formatTimeRemaining(offer.expiresAt)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getStatusIcon(offer.status)}
                            {offer.status}
                          </Badge>
                          {offer.status === "pending" && (
                            <Button size="sm" variant="outline">
                              Accept
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="trades" className="space-y-4">
              <div className="space-y-3">
                {recentTrades.map((trade) => (
                  <div key={trade.hash} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{trade.domain}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Amount: {domaOrderbook.formatPrice(trade.amount, trade.currency)}</span>
                          <span>Type: {trade.type}</span>
                          <span>Gas: {trade.gasUsed?.toString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getStatusIcon(trade.status)}
                        {trade.status}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
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
