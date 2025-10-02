# DOMA Protocol Dashboard

This project is a modern web dashboard built with [Next.js](https://nextjs.org), designed to interact with and visualize data from the **DOMA Protocol**. The application provides a seamless user experience for managing domains, monitoring alerts, and tracking activity, all while leveraging the power and security of the DOMA Protocol.

## About the DOMA Protocol

**DOMA Protocol** is a decentralized protocol for domain management and ownership. It enables users to register, transfer, and manage domain names on-chain, ensuring transparency, security, and censorship resistance. By integrating DOMA, this dashboard allows users to interact directly with the protocol, view their domain assets, receive real-time alerts, and monitor protocol activity.

### How This Project Uses DOMA Protocol

- **Domain Management:** Users can view and manage their registered domains through the dashboard, with all data fetched directly from the DOMA Protocol smart contracts.
- **Alerts:** The app provides real-time alerts for important events such as domain expirations, transfers, or protocol updates, leveraging DOMA’s event system.
- **Activity Feed:** All protocol-related activities (registrations, renewals, transfers) are displayed in an activity log, sourced from DOMA’s on-chain events.
- **Wallet Integration:** Users connect their wallets to authenticate and interact with the DOMA Protocol, ensuring secure and permissionless access.

🚀 Features
🔍 Real-time Monitoring
Live Domain Events: Track domain minting, transfers, and burns in real-time
Event Filtering: Filter by event types (MINTED, TRANSFER, BURNED)
Pagination: Browse through events with configurable page sizes
WebSocket-like Polling: Continuous updates from DOMA's event API

📈 Domain Intelligence
-Recent Domains: View newly tokenized domains on the DOMA protocol
-Active Listings: Monitor marketplace listings and pricing
-Domain Search: Search and monitor specific domains
-Statistics Dashboard: Real-time metrics and insights

🛒 Marketplace Integration
Create Listings: List domains for sale on DOMA and OpenSea orderbooks

Make Offers: Create offers for domains you want to acquire

Order Management: View, search, and cancel your active orders

Multi-Currency Support: Trade using ETH, USDC, DAI, and more

🔔 Alert System
Custom Alerts: Set up notifications for specific domain events

Subscription Tiers: Free, Pro, and Enterprise plans

Real-time Notifications: Get instant alerts for opportunities

Domain Expiration Tracking: Never miss a domain renewal

🛠️ Technology Stack
Frontend: Next.js 15, TypeScript, Tailwind CSS

UI Components: shadcn/ui, Radix UI

Web3 Integration: Wagmi, Viem

Blockchain: DOMA Protocol, Ethereum, Polygon

API Integration: DOMA GraphQL API, REST APIs

State Management: React Hooks, TanStack Query

## Getting Started

To run the project locally, follow these steps:

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. **Open your browser:**

   Visit [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

``` .env
NEXT_PUBLIC_DOMA_API_KEY=your_doma_api_key_here
NEXT_PUBLIC_DOMA_TESTNET_ENDPOINT=https://api-testnet.doma.xyz
```

- `src/components/layout/navbar.tsx`: Main navigation bar, including wallet connection and theme toggle.
- `app/page.tsx`: Main dashboard page, where you can start editing and customizing your app.
- `src/components/connect-wallet.tsx`: Handles wallet connection for DOMA Protocol interactions.
- `src/lib/doma-api.ts`: (If present) Contains utility functions for interacting with DOMA smart contracts.

## Customization

- **Fonts:** Uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for optimized font loading, including [Geist](https://vercel.com/font).
- **Theming:** Supports light and dark themes with a simple toggle in the navbar.

## Learn More

- [DOMA Protocol Documentation](#) - Learn more about the protocol and its smart contracts. *(https://docs.doma.xyz/)*


**Feedback and contributions are welcome!**
