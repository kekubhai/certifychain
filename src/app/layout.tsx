import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from './components/main-nav';
import { ModeToggle } from './components/mode-toggle';
import { UserNav } from './components/user-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CertifyChain - Secure Certificate Management',
  description: 'Securely manage and share your certificates with blockchain technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-background">
            <header className="border-b">
              <div className="flex h-16 items-center px-4 container mx-auto">
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                  <ModeToggle />
                  <UserNav />
                </div>
              </div>
            </header>
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
