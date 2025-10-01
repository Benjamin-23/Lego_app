export const DOMA_CHAIN = {
  id: 137, // Polygon Mainnet - UPDATE WITH DOMA TESTNET CHAIN ID
  name: "Polygon",
  network: "polygon",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://polygon-rpc.com"],
    },
    public: {
      http: ["https://polygon-rpc.com"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "PolygonScan",
      url: "https://polygonscan.com",
    },
    default: {
      name: "PolygonScan",
      url: "https://polygonscan.com",
    },
  },
} as const;

// DOMA Protocol Contract Addresses (UPDATE THESE WITH ACTUAL ADDRESSES)
export const CONTRACT_ADDRESSES = {
  DOMA_TOKEN: "0x...",
  DOMA_LENDING: "0x...",
  DOMA_REGISTRAR: "0x...",
  LOMA_SUBSCRIPTION: "0x...", // Your deployed contract
} as const;

export const SUBSCRIPTION_TIERS = {
  FREE: 0,
  PRO: 1,
  ENTERPRISE: 2,
} as const;

export const TIER_PRICES = {
  [SUBSCRIPTION_TIERS.FREE]: 0,
  [SUBSCRIPTION_TIERS.PRO]: 10, // 10 dTokens
  [SUBSCRIPTION_TIERS.ENTERPRISE]: 100, // 100 dTokens
};