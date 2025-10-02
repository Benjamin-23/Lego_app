# DOMA Protocol Dashboard

This project is a modern web dashboard built with [Next.js](https://nextjs.org), designed to interact with and visualize data from the **DOMA Protocol**. The application provides a seamless user experience for managing domains, monitoring alerts, and tracking activity, all while leveraging the power and security of the DOMA Protocol.

## About the DOMA Protocol

**DOMA Protocol** is a decentralized protocol for domain management and ownership. It enables users to register, transfer, and manage domain names on-chain, ensuring transparency, security, and censorship resistance. By integrating DOMA, this dashboard allows users to interact directly with the protocol, view their domain assets, receive real-time alerts, and monitor protocol activity.

### How This Project Uses DOMA Protocol

- **Domain Management:** Users can view and manage their registered domains through the dashboard, with all data fetched directly from the DOMA Protocol smart contracts.
- **Alerts:** The app provides real-time alerts for important events such as domain expirations, transfers, or protocol updates, leveraging DOMA’s event system.
- **Activity Feed:** All protocol-related activities (registrations, renewals, transfers) are displayed in an activity log, sourced from DOMA’s on-chain events.
- **Wallet Integration:** Users connect their wallets to authenticate and interact with the DOMA Protocol, ensuring secure and permissionless access.

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

- `src/components/layout/navbar.tsx`: Main navigation bar, including wallet connection and theme toggle.
- `app/page.tsx`: Main dashboard page, where you can start editing and customizing your app.
- `src/components/connect-wallet.tsx`: Handles wallet connection for DOMA Protocol interactions.
- `src/lib/doma.ts`: (If present) Contains utility functions for interacting with DOMA smart contracts.

## Customization

- **Fonts:** Uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for optimized font loading, including [Geist](https://vercel.com/font).
- **Theming:** Supports light and dark themes with a simple toggle in the navbar.

## Learn More

- [DOMA Protocol Documentation](#) - Learn more about the protocol and its smart contracts. *(https://docs.doma.xyz/)*


**Feedback and contributions are welcome!**
