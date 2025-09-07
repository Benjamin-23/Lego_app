# Lego - Domain Alert Bot 🤖
## 🚀 Overview

Lego is a comprehensive domain monitoring and trading platform that combines traditional domain tracking with cutting-edge blockchain technology through the Doma Protocol. Built for domain investors, traders, and enthusiasts, Lego provides real-time alerts, automated trading capabilities, and a vibrant community ecosystem.

### Key Features

- 🔍 **Advanced Domain Monitoring** - Track domain expirations, price changes, and availability
- 🛒 **Integrated Trading Platform** - Buy, sell, and trade domains using Doma Protocol
- 🔔 **Multi-Channel Alerts** - Email, SMS, Telegram, and Twitter notifications
- 👥 **Community Features** - Share opportunities, leaderboards, and social interactions
- 💰 **Subscription Tiers** - Flexible plans from free to enterprise
- 🔗 **Multi-Chain Support** - Works across different blockchain networks
- 📊 **Real-Time Analytics** - Comprehensive tracking and reporting

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Blockchain**: Viem, Wagmi, Doma Protocol SDK
- **State Management**: SWR for data fetching and caching
- **Deployment**: Vercel with automatic CI/CD

### Project Structure

\`\`\`
├── app/                    # Next.js app router pages
│   ├── alerts/            # Alert management interface
│   ├── community/         # Community features and forums
│   ├── doma/             # Doma Protocol integration
│   ├── domains/          # Domain monitoring dashboard
│   └── subscriptions/    # Subscription management
├── components/           # Reusable React components
│   ├── ui/              # shadcn/ui base components
│   ├── doma-*.tsx       # Doma Protocol components
│   ├── alert-*.tsx      # Alert system components
│   └── community-*.tsx  # Community features
├── lib/                 # Utility functions and configurations
│   ├── doma-client.ts   # Doma Protocol API client
│   ├── doma-orderbook-sdk.ts # Trading SDK integration
│   └── wagmi-config.ts  # Wallet connection setup
└── scripts/            # Database and utility scripts
\`\`\`

## 🔗 Doma Protocol Integration

### What is Doma Protocol?

Doma Protocol is a comprehensive DomainFi infrastructure that enables domain tokenization, trading, and on-chain management. It provides:

- **Domain Tokenization** - Convert traditional domains into NFTs
- **Real-Time Synchronization** - Bi-directional sync between ICANN and blockchain
- **Trading Infrastructure** - Decentralized marketplace for domain trading
- **Reseller APIs** - Non-ICANN accredited domain registration

### How Lego Uses Doma

#### 1. Domain Registration & Tokenization

\`\`\`typescript
// Register and tokenize domains through Doma
const domaClient = new DomaClient({
  apiKey: process.env.NEXT_PUBLIC_DOMA_API_KEY,
  network: process.env.NEXT_PUBLIC_DOMA_NETWORK
});

// Register a new domain
const registration = await domaClient.registerDomain({
  domain: 'example.com',
  duration: 1, // years
  tokenize: true // Convert to NFT
});
\`\`\`

#### 2. Orderbook Trading

\`\`\`typescript
// Initialize the orderbook SDK with wallet connection
const orderbook = new DomaOrderbookSDK({
  network: 'mainnet',
  walletClient: useWalletClient(),
  publicClient: usePublicClient()
});

// Create a domain listing
await orderbook.createListing({
  tokenId: '123',
  price: parseEther('1.5'),
  currency: 'ETH',
  duration: 30 // days
});
\`\`\`

#### 3. Real-Time Monitoring

\`\`\`typescript
// Monitor on-chain domain events
const subscription = domaClient.subscribeToEvents({
  eventTypes: ['transfer', 'listing', 'sale'],
  callback: (event) => {
    // Trigger alerts based on domain events
    alertEngine.processEvent(event);
  }
});
\`\`\`

#### 4. Multi-Chain Support

Lego supports domain operations across multiple networks:

- **Ethereum Mainnet** - Primary trading and high-value domains
- **Polygon** - Lower fees for frequent trading
- **Arbitrum** - Fast transactions and reduced costs
- **Base** - Coinbase ecosystem integration

### Doma Features in Lego

| Feature | Description | Implementation |
|---------|-------------|----------------|
| **Domain Search** | Find available domains across registrars | `components/domain-search.tsx` |
| **Tokenization** | Convert domains to tradeable NFTs | `lib/doma-client.ts` |
| **Marketplace** | Browse and trade tokenized domains | `components/doma-orderbook.tsx` |
| **Price Discovery** | Real-time domain valuations | `lib/doma-orderbook-sdk.ts` |
| **Ownership Transfer** | Seamless domain transfers | Integrated in trading flows |
| **Event Monitoring** | Track all domain-related events | `components/alert-*.tsx` |

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- Wallet with testnet/mainnet funds
- WalletConnect Project ID

### Environment Variables

\`\`\`bash
# Doma Protocol Configuration
NEXT_PUBLIC_DOMA_API_KEY=your_doma_api_key
NEXT_PUBLIC_DOMA_BASE_URL=https://api.doma.dev
NEXT_PUBLIC_DOMA_NETWORK=mainnet

# Wallet Connection
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_id

# Optional: Notification Services
TELEGRAM_BOT_TOKEN=your_telegram_token
TWITTER_API_KEY=your_twitter_key
SENDGRID_API_KEY=your_sendgrid_key
\`\`\`

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/lego-bot-doma.git
   cd lego-bot-doma
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure environment**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   \`\`\`

4. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open in browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

## 📖 Usage Guide

### Getting Started

1. **Connect Your Wallet** - Use the wallet connection button to link your Web3 wallet
2. **Choose Subscription** - Select a plan that fits your monitoring needs
3. **Add Domains** - Search and add domains to your watchlist
4. **Set Up Alerts** - Configure notifications for price changes, expirations, etc.
5. **Join Community** - Share opportunities and learn from other domain investors

### Domain Monitoring

- **Watchlist Management** - Track unlimited domains (subscription dependent)
- **Price Alerts** - Get notified when domain prices drop or rise
- **Expiration Tracking** - Never miss important renewal dates
- **Availability Monitoring** - Be first to know when domains become available

### Trading Features

- **Browse Marketplace** - Discover tokenized domains for sale
- **Create Listings** - List your domains for sale with custom pricing
- **Make Offers** - Submit offers on domains you want to acquire
- **Transaction History** - Track all your domain trading activity

### Alert Configuration

\`\`\`typescript
// Example alert rule configuration
const alertRule = {
  name: "Premium Domain Drops",
  conditions: {
    priceChange: { threshold: -20, operator: "less_than" },
    domainLength: { max: 6 },
    tld: ["com", "eth", "crypto"]
  },
  channels: ["email", "telegram"],
  frequency: "immediate"
};
\`\`\`

## 🤝 Community Features

- **Domain Opportunities** - Share and discover valuable domain finds
- **Discussion Forums** - Engage with other domain enthusiasts
- **Leaderboards** - Compete based on successful trades and contributions
- **Social Interactions** - Like, save, and comment on community posts
- **Reputation System** - Build credibility through valuable contributions

## 🔧 API Reference

### Doma Client Methods

\`\`\`typescript
// Domain operations
await domaClient.searchDomains(query)
await domaClient.registerDomain(options)
await domaClient.tokenizeDomain(domain)
await domaClient.transferDomain(domain, newOwner)

// Monitoring
await domaClient.subscribeToEvents(config)
await domaClient.getDomainHistory(domain)
await domaClient.getMarketData(domain)
\`\`\`

### Orderbook SDK Methods

\`\`\`typescript
// Trading operations
await orderbook.createListing(listing)
await orderbook.buyListing(listingId)
await orderbook.createOffer(offer)
await orderbook.acceptOffer(offerId)
await orderbook.cancelListing(listingId)
\`\`\`

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository** - Link your GitHub repo to Vercel
2. **Configure Environment** - Add all required environment variables
3. **Deploy** - Automatic deployment on every push to main

### Manual Deployment

\`\`\`bash
# Build the application
npm run build

# Start production server
npm start
\`\`\`

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Doma Protocol Docs](https://docs.doma.dev)
- **Community**: Join our [Discord](https://discord.gg/doma)
- **Issues**: [GitHub Issues](https://github.com/your-username/lego-bot-doma/issues)
- **Email**: support@lego-bot.com

## 🙏 Acknowledgments

- **Doma Protocol** - For providing the DomainFi infrastructure
- **Vercel** - For hosting and deployment platform
- **v0.app** - For rapid development and prototyping
- **Community** - For feedback and contributions

---

**Built with ❤️**
