import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/navbar';
import { Toaster } from '@/components/ui/sonner';
import { getSession } from '@/service/getMe';

// import { getSession } from '@/service/getMe';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'FixItNow — Home services, dispatched fast',
  description:
    'Book verified plumbers, electricians, cleaners and more. Track every job from request to completion.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navbar session={session} />
        <main className="flex-1">{children}</main>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}