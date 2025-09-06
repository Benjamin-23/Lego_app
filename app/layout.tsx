import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { wagmiConfig } from "@/lib/wagmi-config"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lego - Domain Alert Bot",
  description: "Automated domain monitoring and trading with Doma Protocol integration",
  generator: "lego.app",
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={null}>{children}</Suspense>
          </QueryClientProvider>
        </WagmiProvider>
        <Analytics />
      </body>
    </html>
  )
}
