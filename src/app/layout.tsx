import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Web3Provider } from '@/components/providers/web3-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lego - DOMA Alert System',
  description: 'Get automated alerts for DOMA domain events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Web3Provider>
            <div className="min-h-screen bg-background bg-[radial-gradient(100%_100%_at_50%_0%,hsl(0_0%_100%/.08)_0,transparent_60%),linear-gradient(to_bottom_right,hsl(217_91%_60%/.06),transparent)]">
              <Navbar />
              <main className="container mx-auto px-4">{children}</main>
              <Toaster />
            </div>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}