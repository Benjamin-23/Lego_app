"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, Medal, Award } from "lucide-react"
import type { LeaderboardEntry } from "@/lib/community-types"

export function CommunityLeaderboard() {
  const [leaderboards, setLeaderboards] = useState<Record<string, LeaderboardEntry[]>>({})

  // Mock data for demonstration
  useEffect(() => {
    const mockLeaderboards = {
      reputation: [
        {
          rank: 1,
          user: {
            id: "1",
            username: "domainmaster",
            displayName: "Domain Master",
            reputation: 3450,
            level: 15,
            joinedAt: "2022-01-15",
            stats: {
              domainsShared: 156,
              alertsTriggered: 445,
              communitySaves: 234,
              followersCount: 678,
              followingCount: 89,
            },
            badges: [],
          },
          score: 3450,
          change: 0,
          category: "reputation" as const,
        },
        {
          rank: 2,
          user: {
            id: "2",
            username: "cryptohunter",
            displayName: "Crypto Hunter",
            reputation: 2890,
            level: 13,
            joinedAt: "2022-03-20",
            stats: {
              domainsShared: 123,
              alertsTriggered: 356,
              communitySaves: 189,
              followersCount: 445,
              followingCount: 67,
            },
            badges: [],
          },
          score: 2890,
          change: 1,
          category: "reputation" as const,
        },
        {
          rank: 3,
          user: {
            id: "3",
            username: "domainpro",
            displayName: "Domain Pro",
            reputation: 2650,
            level: 12,
            joinedAt: "2022-05-10",
            stats: {
              domainsShared: 98,
              alertsTriggered: 278,
              communitySaves: 167,
              followersCount: 334,
              followingCount: 45,
            },
            badges: [],
          },
          score: 2650,
          change: -1,
          category: "reputation" as const,
        },
      ],
      domains_found: [
        {
          rank: 1,
          user: {
            id: "4",
            username: "domainhunter",
            displayName: "Domain Hunter",
            reputation: 1890,
            level: 10,
            joinedAt: "2022-08-15",
            stats: {
              domainsShared: 234,
              alertsTriggered: 567,
              communitySaves: 123,
              followersCount: 234,
              followingCount: 78,
            },
            badges: [],
          },
          score: 234,
          change: 2,
          category: "domains_found" as const,
        },
      ],
    }

    setLeaderboards(mockLeaderboards)
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Community Leaderboard
        </CardTitle>
        <CardDescription>Top contributors and domain hunters</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="reputation" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reputation">Reputation</TabsTrigger>
            <TabsTrigger value="domains_found">Domains Found</TabsTrigger>
            <TabsTrigger value="alerts_shared">Alerts Shared</TabsTrigger>
            <TabsTrigger value="community_saves">Community Saves</TabsTrigger>
          </TabsList>

          <TabsContent value="reputation" className="space-y-3">
            {leaderboards.reputation?.map((entry) => (
              <div key={entry.user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8">{getRankIcon(entry.rank)}</div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={entry.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {entry.user.displayName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{entry.user.displayName}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Level {entry.user.level}</span>
                      <span>•</span>
                      <span>{entry.user.stats.followersCount} followers</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold">{entry.score.toLocaleString()}</p>
                    <div className={`flex items-center gap-1 text-sm ${getChangeColor(entry.change)}`}>
                      {getChangeIcon(entry.change)}
                      <span>{Math.abs(entry.change)} this week</span>
                    </div>
                  </div>
                  {entry.rank <= 3 && (
                    <Badge variant={entry.rank === 1 ? "default" : "secondary"}>Top {entry.rank}</Badge>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="domains_found" className="space-y-3">
            {leaderboards.domains_found?.map((entry) => (
              <div key={entry.user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8">{getRankIcon(entry.rank)}</div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={entry.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {entry.user.displayName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{entry.user.displayName}</p>
                    <p className="text-sm text-muted-foreground">{entry.user.stats.domainsShared} domains shared</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold">{entry.score}</p>
                  <p className="text-sm text-muted-foreground">domains found</p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="alerts_shared">
            <div className="text-center py-8">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Leaderboard data loading...</p>
            </div>
          </TabsContent>

          <TabsContent value="community_saves">
            <div className="text-center py-8">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Leaderboard data loading...</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
