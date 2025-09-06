// Doma Protocol integration client
export interface DomaConfig {
  apiKey: string
  baseUrl: string
  network: "mainnet" | "testnet"
}

export interface DomainRegistration {
  domain: string
  registrant: string
  duration: number
  price: number
  tokenize?: boolean
}

export interface OnChainDomain {
  id: string
  domain: string
  owner: string
  tokenId?: string
  isTokenized: boolean
  expiryDate: string
  registrar: string
  lastSync: string
  onChainStatus: "active" | "expired" | "transferred" | "pending"
}

export interface DomainEvent {
  id: string
  domain: string
  eventType: "registration" | "transfer" | "expiry" | "tokenization" | "price_change"
  timestamp: string
  details: Record<string, any>
  txHash?: string
}

export class DomaClient {
  private config: DomaConfig

  constructor(config: DomaConfig) {
    this.config = config
  }

  // Domain registration through Doma reseller API
  async registerDomain(
    registration: DomainRegistration,
  ): Promise<{ success: boolean; txHash?: string; error?: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/v1/domains/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: registration.domain,
          registrant: registration.registrant,
          duration: registration.duration,
          tokenize: registration.tokenize || false,
          network: this.config.network,
        }),
      })

      const data = await response.json()
      return {
        success: response.ok,
        txHash: data.txHash,
        error: data.error,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      }
    }
  }

  // Get on-chain domain information
  async getDomainInfo(domain: string): Promise<OnChainDomain | null> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/v1/domains/${domain}`, {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      })

      if (!response.ok) return null
      return await response.json()
    } catch (error) {
      console.error("Failed to fetch domain info:", error)
      return null
    }
  }

  // Tokenize existing domain
  async tokenizeDomain(
    domain: string,
  ): Promise<{ success: boolean; tokenId?: string; txHash?: string; error?: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/v1/domains/${domain}/tokenize`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      console.log(data, "tokenized data")
      return {
        success: response.ok,
        tokenId: data.tokenId,
        txHash: data.txHash,  
        error: data.error,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Tokenization failed",
      }
    }
  }

  // Get domain events and changes
  async getDomainEvents(domain?: string, limit = 50): Promise<DomainEvent[]> {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        ...(domain && { domain }),
      })

      const response = await fetch(`${this.config.baseUrl}/api/v1/events?${params}`, {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      })

      if (!response.ok) return []
      const data = await response.json()
      return data.events || []
    } catch (error) {
      console.error("Failed to fetch domain events:", error)
      return []
    }
  }

  // Subscribe to real-time domain updates
  async subscribeToUpdates(domains: string[], callback: (event: DomainEvent) => void): Promise<WebSocket | null> {
    try {
      const wsUrl = `${this.config.baseUrl.replace("http", "ws")}/ws/domains`
      const ws = new WebSocket(`${wsUrl}?token=${this.config.apiKey}`)

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            action: "subscribe",
            domains: domains,
          }),
        )
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === "domain_event") {
            callback(data.event)
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error)
        }
      }

      return ws
    } catch (error) {
      console.error("Failed to establish WebSocket connection:", error)
      return null
    }
  }
}

// Initialize Doma client (in a real app, these would come from environment variables)
export const domaClient = new DomaClient({
  apiKey: process.env.NEXT_PUBLIC_DOMA_API_KEY || "demo-key",
  baseUrl: process.env.NEXT_PUBLIC_DOMA_BASE_URL || "https://api.doma.xyz",
  network: (process.env.NEXT_PUBLIC_DOMA_NETWORK as "mainnet" | "testnet") || "testnet",
})
