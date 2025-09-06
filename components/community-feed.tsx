"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Bookmark, Share2, TrendingUp, Clock, DollarSign, Globe } from "lucide-react"
import type { DomainOpportunity, CommunityPost } from "@/lib/community-types"

export function CommunityFeed() {
  const [opportunities, setOpportunities] = useState<DomainOpportunity[]>([])
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [activeTab, setActiveTab] = useState("opportunities")

  // Mock data for demonstration
  useEffect(() => {
    const mockOpportunities: DomainOpportunity[] = [
      {
        id: "1",
        domain: "techstartup.com",
        type: "price_drop",
        currentPrice: 2500,
        previousPrice: 3200,
        description: "Great domain for tech companies. Price dropped 22% in the last week!",
        sharedBy: {
          id: "user1",
          username: "domainpro",
          displayName: "Domain Pro",
          reputation: 1250,
          level: 8,
          joinedAt: "2023-01-15",
          stats: {
            domainsShared: 45,
            alertsTriggered: 120,
            communitySaves: 89,
            followersCount: 234,
            followingCount: 67,
          },
          badges: [],
        },
        sharedAt: "2024-03-15T10:30:00Z",
        likes: 23,
        comments: 8,
        saves: 15,
        tags: ["tech", "startup", "premium"],
        isLiked: false,
        isSaved: true,
      },
      {
        id: "2",
        domain: "cryptoexchange.org",
        type: "expiring",
        expiryDate: "2024-04-20",
        description: "High-value crypto domain expiring soon. Owner might not renew.",
        sharedBy: {
          id: "user2",
          username: "cryptohunter",
          displayName: "Crypto Hunter",
          reputation: 890,
          level: 6,
          joinedAt: "2023-06-20",
          stats: {
            domainsShared: 28,
            alertsTriggered: 67,
            communitySaves: 45,
            followersCount: 156,
            followingCount: 89,
          },
          badges: [],
        },
        sharedAt: "2024-03-15T09:15:00Z",
        likes: 31,
        comments: 12,
        saves: 22,
        tags: ["crypto", "expiring", "high-value"],
        isLiked: true,
        isSaved: false,
      },
    ]

    const mockPosts: CommunityPost[] = [
      {
        id: "1",
        author: {
          id: "user3",
          username: "domainexpert",
          displayName: "Domain Expert",
          reputation: 2100,
          level: 12,
          joinedAt: "2022-08-10",
          stats: {
            domainsShared: 78,
            alertsTriggered: 245,
            communitySaves: 156,
            followersCount: 445,
            followingCount: 123,
          },
          badges: [],
        },
        content: "Just noticed a trend in AI-related domains. Prices are up 40% this month. Anyone else seeing this?",
        type: "discussion",
        createdAt: "2024-03-15T11:00:00Z",
        likes: 18,
        replies: 7,
        tags: ["ai", "trends", "market-analysis"],
        isLiked: false,
      },
    ]

    setOpportunities(mockOpportunities)
    setPosts(mockPosts)
  }, [])

  const handleLike = (id: string, type: "opportunity" | "post") => {
    if (type === "opportunity") {
      setOpportunities((prev) =>
        prev.map((opp) =>
          opp.id === id ? { ...opp, isLiked: !opp.isLiked, likes: opp.isLiked ? opp.likes - 1 : opp.likes + 1 } : opp,
        ),
      )
    } else {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
            : post,
        ),
      )
    }
  }

  const handleSave = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id ? { ...opp, isSaved: !opp.isSaved, saves: opp.isSaved ? opp.saves - 1 : opp.saves + 1 } : opp,
      ),
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "price_drop":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "expiring":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "available":
        return <Globe className="h-4 w-4 text-blue-500" />
      case "auction":
        return <DollarSign className="h-4 w-4 text-purple-500" />
      default:
        return <Globe className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "price_drop":
        return "default"
      case "expiring":
        return "destructive"
      case "available":
        return "secondary"
      case "auction":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="opportunities">Domain Opportunities</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={opportunity.sharedBy.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {opportunity.sharedBy.displayName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{opportunity.sharedBy.displayName}</p>
                      <p className="text-sm text-muted-foreground">
                        Level {opportunity.sharedBy.level} • {opportunity.sharedBy.reputation} reputation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(opportunity.type)}
                    <Badge variant={getTypeColor(opportunity.type)}>{opportunity.type.replace("_", " ")}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{opportunity.domain}</h3>
                  <p className="text-muted-foreground mt-1">{opportunity.description}</p>
                </div>

                {opportunity.currentPrice && (
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-medium">Current: ${opportunity.currentPrice.toLocaleString()}</span>
                    {opportunity.previousPrice && (
                      <span className="text-green-600">
                        ↓ ${(opportunity.previousPrice - opportunity.currentPrice).toLocaleString()}(
                        {Math.round(
                          ((opportunity.previousPrice - opportunity.currentPrice) / opportunity.previousPrice) * 100,
                        )}
                        %)
                      </span>
                    )}
                  </div>
                )}

                {opportunity.expiryDate && (
                  <div className="text-sm">
                    <span className="font-medium">Expires: </span>
                    <span className="text-yellow-600">{new Date(opportunity.expiryDate).toLocaleDateString()}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(opportunity.id, "opportunity")}
                      className={opportunity.isLiked ? "text-red-500" : ""}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${opportunity.isLiked ? "fill-current" : ""}`} />
                      {opportunity.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {opportunity.comments}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSave(opportunity.id)}
                      className={opportunity.isSaved ? "text-blue-500" : ""}
                    >
                      <Bookmark className={`h-4 w-4 mr-1 ${opportunity.isSaved ? "fill-current" : ""}`} />
                      {opportunity.saves}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {post.author.displayName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{post.author.displayName}</p>
                      <Badge variant="outline" className="text-xs">
                        Level {post.author.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{post.content}</p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id, "post")}
                    className={post.isLiked ? "text-red-500" : ""}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.replies}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trending">
          <Card>
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
              <CardDescription>Popular discussions and domain trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">#ai-domains</p>
                    <p className="text-sm text-muted-foreground">127 posts this week</p>
                  </div>
                  <Badge>Trending</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">#crypto-expiring</p>
                    <p className="text-sm text-muted-foreground">89 posts this week</p>
                  </div>
                  <Badge variant="secondary">Hot</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">#premium-drops</p>
                    <p className="text-sm text-muted-foreground">56 posts this week</p>
                  </div>
                  <Badge variant="outline">Rising</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
