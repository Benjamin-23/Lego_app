// DomaOrderbookSDK - TypeScript SDK for Doma Domain trading operations
import { type Address, type Hash, formatEther } from "viem"
import type { PublicClient, WalletClient } from "viem"

export interface DomaOrderbookConfig {
  apiKey: string
  baseUrl: string
  network: "mainnet" | "testnet"
  marketplaceFeePercent: number
  walletClient?: WalletClient
  publicClient?: PublicClient
}

export interface DomainListing {
  id: string
  domain: string
  tokenId: string
  seller: Address
  price: bigint
  currency: Address // Token contract address (ETH = 0x0)
  expiresAt: number
  status: "active" | "sold" | "cancelled" | "expired"
  createdAt: string
  marketplaceFee: bigint
}

export interface DomainOffer {
  id: string
  domain: string
  tokenId: string
  buyer: Address
  seller?: Address
  amount: bigint
  currency: Address
  expiresAt: number
  status: "pending" | "accepted" | "rejected" | "cancelled" | "expired"
  createdAt: string
}

export interface TradeTransaction {
  hash: Hash
  type: "listing" | "offer" | "purchase" | "cancellation"
  domain: string
  amount: bigint
  currency: Address
  from: Address
  to: Address
  status: "pending" | "confirmed" | "failed"
  timestamp: string
  gasUsed?: bigint
  marketplaceFee?: bigint
}

export interface ProgressCallback {
  onStart?: () => void
  onProgress?: (step: string, progress: number) => void
  onComplete?: (result: any) => void
  onError?: (error: Error) => void
}

export class DomaOrderbookSDK {
  private config: DomaOrderbookConfig

  constructor(config: DomaOrderbookConfig) {
    this.config = config
  }

  setWalletClient(walletClient: WalletClient) {
    this.config.walletClient = walletClient
  }

  setPublicClient(publicClient: PublicClient) {
    this.config.publicClient = publicClient
  }

  private validateWalletConnection(): boolean {
    return !!(this.config.walletClient && this.config.publicClient)
  }

  // Listing Management
  async createListing(
    domain: string,
    tokenId: string,
    price: bigint,
    currency: Address = "0x0", // ETH by default
    duration = 30, // days
    callbacks?: ProgressCallback,
  ): Promise<{ success: boolean; listingId?: string; txHash?: Hash; error?: string }> {
    try {
      if (!this.validateWalletConnection()) {
        throw new Error("Wallet not connected. Please connect your wallet first.")
      }

      callbacks?.onStart?.()
      callbacks?.onProgress?.("Validating wallet connection", 10)

      const account = this.config.walletClient!.account
      if (!account) {
        throw new Error("No account found in wallet")
      }

      callbacks?.onProgress?.("Calculating fees", 25)

      const marketplaceFee = this.calculateMarketplaceFee(price)
      const expiresAt = Math.floor(Date.now() / 1000) + duration * 24 * 60 * 60

      callbacks?.onProgress?.("Creating listing transaction", 50)

      const response = await fetch(`${this.config.baseUrl}/api/v1/listings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
          "X-Wallet-Address": account.address,
        },
        body: JSON.stringify({
          domain,
          tokenId,
          price: price.toString(),
          currency,
          expiresAt,
          marketplaceFee: marketplaceFee.toString(),
          network: this.config.network,
          walletAddress: account.address,
        }),
      })

      callbacks?.onProgress?.("Processing transaction", 75)
      const data = await response.json()

      if (response.ok) {
        callbacks?.onProgress?.("Listing created", 100)
        callbacks?.onComplete?.(data)
        return {
          success: true,
          listingId: data.listingId,
          txHash: data.txHash,
        }
      } else {
        throw new Error(data.error || "Failed to create listing")
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Listing creation failed"
      callbacks?.onError?.(new Error(errorMsg))
      return { success: false, error: errorMsg }
    }
  }

  async buyListing(
    listingId: string,
    callbacks?: ProgressCallback,
  ): Promise<{ success: boolean; txHash?: Hash; error?: string }> {
    try {
      if (!this.validateWalletConnection()) {
        throw new Error("Wallet not connected. Please connect your wallet first.")
      }

      callbacks?.onStart?.()
      callbacks?.onProgress?.("Validating wallet connection", 10)

      const account = this.config.walletClient!.account
      if (!account) {
        throw new Error("No account found in wallet")
      }

      callbacks?.onProgress?.("Fetching listing details", 25)

      const listing = await this.getListing(listingId)
      if (!listing) {
        throw new Error("Listing not found")
      }

      callbacks?.onProgress?.("Checking wallet balance", 40)
      const balance = await this.config.publicClient!.getBalance({
        address: account.address,
      })

      const totalCost = listing.price + listing.marketplaceFee
      if (balance < totalCost) {
        throw new Error("Insufficient balance for purchase")
      }

      callbacks?.onProgress?.("Processing purchase", 60)

      const response = await fetch(`${this.config.baseUrl}/api/v1/listings/${listingId}/buy`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
          "X-Wallet-Address": account.address,
        },
        body: JSON.stringify({
          buyerAddress: account.address,
        }),
      })

      callbacks?.onProgress?.("Confirming transaction", 80)
      const data = await response.json()

      if (response.ok) {
        callbacks?.onProgress?.("Purchase completed", 100)
        callbacks?.onComplete?.(data)
        return {
          success: true,
          txHash: data.txHash,
        }
      } else {
        throw new Error(data.error || "Purchase failed")
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Purchase failed"
      callbacks?.onError?.(new Error(errorMsg))
      return { success: false, error: errorMsg }
    }
  }

  async cancelListing(
    listingId: string,
    callbacks?: ProgressCallback,
  ): Promise<{ success: boolean; txHash?: Hash; error?: string }> {
    try {
      callbacks?.onStart?.()
      callbacks?.onProgress?.("Cancelling listing", 50)

      const response = await fetch(`${this.config.baseUrl}/api/v1/listings/${listingId}/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        callbacks?.onProgress?.("Listing cancelled", 100)
        callbacks?.onComplete?.(data)
        return {
          success: true,
          txHash: data.txHash,
        }
      } else {
        throw new Error(data.error || "Cancellation failed")
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Cancellation failed"
      callbacks?.onError?.(new Error(errorMsg))
      return { success: false, error: errorMsg }
    }
  }

  // Offer System
  async createOffer(
    domain: string,
    tokenId: string,
    amount: bigint,
    currency: Address = "0x0",
    duration = 7, // days
    callbacks?: ProgressCallback,
  ): Promise<{ success: boolean; offerId?: string; txHash?: Hash; error?: string }> {
    try {
      callbacks?.onStart?.()
      callbacks?.onProgress?.("Creating offer", 50)

      const expiresAt = Math.floor(Date.now() / 1000) + duration * 24 * 60 * 60

      const response = await fetch(`${this.config.baseUrl}/api/v1/offers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain,
          tokenId,
          amount: amount.toString(),
          currency,
          expiresAt,
          network: this.config.network,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        callbacks?.onProgress?.("Offer created", 100)
        callbacks?.onComplete?.(data)
        return {
          success: true,
          offerId: data.offerId,
          txHash: data.txHash,
        }
      } else {
        throw new Error(data.error || "Offer creation failed")
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Offer creation failed"
      callbacks?.onError?.(new Error(errorMsg))
      return { success: false, error: errorMsg }
    }
  }

  async acceptOffer(
    offerId: string,
    callbacks?: ProgressCallback,
  ): Promise<{ success: boolean; txHash?: Hash; error?: string }> {
    try {
      callbacks?.onStart?.()
      callbacks?.onProgress?.("Accepting offer", 50)

      const response = await fetch(`${this.config.baseUrl}/api/v1/offers/${offerId}/accept`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        callbacks?.onProgress?.("Offer accepted", 100)
        callbacks?.onComplete?.(data)
        return {
          success: true,
          txHash: data.txHash,
        }
      } else {
        throw new Error(data.error || "Failed to accept offer")
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to accept offer"
      callbacks?.onError?.(new Error(errorMsg))
      return { success: false, error: errorMsg }
    }
  }

  // Data Fetching
  async getListing(listingId: string): Promise<DomainListing | null> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/v1/listings/${listingId}`, {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      })

      if (!response.ok) return null
      return await response.json()
    } catch (error) {
      console.error("Failed to fetch listing:", error)
      return null
    }
  }

  async getListings(filters?: {
    domain?: string
    seller?: Address
    minPrice?: bigint
    maxPrice?: bigint
    currency?: Address
    status?: string
  }): Promise<DomainListing[]> {
    try {
      const params = new URLSearchParams()
      if (filters?.domain) params.append("domain", filters.domain)
      if (filters?.seller) params.append("seller", filters.seller)
      if (filters?.minPrice) params.append("minPrice", filters.minPrice.toString())
      if (filters?.maxPrice) params.append("maxPrice", filters.maxPrice.toString())
      if (filters?.currency) params.append("currency", filters.currency)
      if (filters?.status) params.append("status", filters.status)

      const response = await fetch(`${this.config.baseUrl}/api/v1/listings?${params}`, {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      })

      if (!response.ok) return []
      const data = await response.json()
      return data.listings || []
    } catch (error) {
      console.error("Failed to fetch listings:", error)
      return []
    }
  }

  async getOffers(filters?: {
    domain?: string
    buyer?: Address
    seller?: Address
    status?: string
  }): Promise<DomainOffer[]> {
    try {
      const params = new URLSearchParams()
      if (filters?.domain) params.append("domain", filters.domain)
      if (filters?.buyer) params.append("buyer", filters.buyer)
      if (filters?.seller) params.append("seller", filters.seller)
      if (filters?.status) params.append("status", filters.status)

      const response = await fetch(`${this.config.baseUrl}/api/v1/offers?${params}`, {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      })

      if (!response.ok) return []
      const data = await response.json()
      return data.offers || []
    } catch (error) {
      console.error("Failed to fetch offers:", error)
      return []
    }
  }

  // Utility Functions
  calculateMarketplaceFee(price: bigint): bigint {
    return (price * BigInt(this.config.marketplaceFeePercent * 100)) / BigInt(10000)
  }

  formatPrice(price: bigint, currency: Address = "0x0"): string {
    if (currency === "0x0") {
      return `${formatEther(price)} ETH`
    }
    // For other tokens, you'd need to fetch decimals and symbol
    return `${formatEther(price)} TOKEN`
  }

  isValidCurrency(currency: Address): boolean {
    // Add your supported currencies here
    const supportedCurrencies = [
      "0x0", // ETH
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
      // Add more supported token addresses
    ]
    return supportedCurrencies.includes(currency)
  }

  // WETH Support
  async wrapETH(amount: bigint): Promise<{ success: boolean; txHash?: Hash; error?: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/v1/weth/wrap`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount.toString(),
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
        error: error instanceof Error ? error.message : "WETH wrap failed",
      }
    }
  }

  async unwrapWETH(amount: bigint): Promise<{ success: boolean; txHash?: Hash; error?: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/v1/weth/unwrap`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount.toString(),
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
        error: error instanceof Error ? error.message : "WETH unwrap failed",
      }
    }
  }

  async getWalletBalance(address?: Address): Promise<{ balance: bigint; formatted: string } | null> {
    try {
      if (!this.config.publicClient) return null

      const walletAddress = address || this.config.walletClient?.account?.address
      if (!walletAddress) return null

      const balance = await this.config.publicClient.getBalance({
        address: walletAddress,
      })

      return {
        balance,
        formatted: formatEther(balance),
      }
    } catch (error) {
      console.error("Failed to fetch wallet balance:", error)
      return null
    }
  }

  async getTransactionStatus(txHash: Hash): Promise<{
    status: "pending" | "confirmed" | "failed"
    blockNumber?: bigint
    gasUsed?: bigint
  } | null> {
    try {
      if (!this.config.publicClient) return null

      const receipt = await this.config.publicClient.getTransactionReceipt({
        hash: txHash,
      })

      return {
        status: receipt.status === "success" ? "confirmed" : "failed",
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed,
      }
    } catch (error) {
      // Transaction might still be pending
      return { status: "pending" }
    }
  }
}

// Initialize DomaOrderbookSDK
export const domaOrderbook = new DomaOrderbookSDK({
  apiKey: process.env.NEXT_PUBLIC_DOMA_API_KEY || "demo-key",
  baseUrl: process.env.NEXT_PUBLIC_DOMA_BASE_URL || "https://api.doma.xyz",
  network: (process.env.NEXT_PUBLIC_DOMA_NETWORK as "mainnet" | "testnet") || "testnet",
  marketplaceFeePercent: 2.5, // 2.5% marketplace fee
})
