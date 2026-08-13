// import type { Metadata } from 'next';
// import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
// import './globals.css';
// import Navbar from '@/components/shared/navbar';
// import { Toaster } from '@/components/ui/sonner';
// import { getSession } from '@/service/getMe';
// import Footer from '@/components/shared/footer';
// import { ThemeProvider } from '@/components/shared/theme-provider';

// // import { getSession } from '@/service/getMe';

// const display = Space_Grotesk({
//   subsets: ['latin'],
//   variable: '--font-display',
//   weight: ['500', '600', '700'],
// });

// const body = Inter({
//   subsets: ['latin'],
//   variable: '--font-body',
//   weight: ['400', '500', '600'],
// });

// const mono = JetBrains_Mono({
//   subsets: ['latin'],
//   variable: '--font-mono',
//   weight: ['400', '500'],
// });

// export const metadata: Metadata = {
//   title: 'FixService-Payment — Home services, Afordable and fast',
//   description:
//     'Book verified plumbers, electricians, cleaners and more. Track every job from request to completion.',
// };

// export default async function RootLayout({ children }: { children: React.ReactNode }) {
//   const session = await getSession();

//   return (
//     <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
//       <body className="flex min-h-screen flex-col">

//         {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}

//         <Navbar session={session} />
//         <main className="flex-1">{children}</main>
//         <Footer />
//         <Toaster position="top-center" />

//         {/* </ThemeProvider> */}

//       </body>
//     </html>
//   );
// }

import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/navbar';
import { Toaster } from '@/components/ui/sonner';
import { getSession } from '@/service/getMe';
import Footer from '@/components/shared/footer';
import { ThemeProvider } from '@/components/shared/theme-provider';

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
  title: 'FixService-Payment — Home services, Afordable and fast',
  icons: {
    icon: './favicon.png',
    // Optional: add Apple touch icon or alternative sizes
    shortcut: './favicon.png',
    apple: './apple-touch-icon.png',
  },

  description:
    'Book verified plumbers, electricians, cleaners and more. Track every job from request to completion.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}

        <ThemeProvider
          attribute="class"
          // defaultTheme="light"
          defaultTheme="system"
          enableSystem={false}
          disableTransitionOnChange>

          <Navbar session={session} />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-center" />

        </ThemeProvider>
      </body>
    </html>
  );
}
