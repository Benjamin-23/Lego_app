export interface CommunityUser {
  id: string
  username: string
  displayName: string
  avatar?: string
  reputation: number
  level: number
  joinedAt: string
  stats: {
    domainsShared: number
    alertsTriggered: number
    communitySaves: number
    followersCount: number
    followingCount: number
  }
  badges: UserBadge[]
}

export interface UserBadge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

export interface DomainOpportunity {
  id: string
  domain: string
  type: "expiring" | "price_drop" | "available" | "auction" | "trending"
  currentPrice?: number
  previousPrice?: number
  expiryDate?: string
  description: string
  sharedBy: CommunityUser
  sharedAt: string
  likes: number
  comments: number
  saves: number
  tags: string[]
  isLiked?: boolean
  isSaved?: boolean
}

export interface CommunityPost {
  id: string
  author: CommunityUser
  content: string
  type: "discussion" | "opportunity" | "tip" | "question"
  createdAt: string
  likes: number
  replies: number
  tags: string[]
  isLiked?: boolean
  opportunity?: DomainOpportunity
}

export interface LeaderboardEntry {
  rank: number
  user: CommunityUser
  score: number
  change: number // position change from last period
  category: "reputation" | "domains_found" | "alerts_shared" | "community_saves"
}
