import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SITE, PROMO } from '@/lib/config';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { CartDrawer } from '@/components/store/CartDrawer';
import { SearchDialog } from '@/components/store/SearchDialog';
import { QuickAddModal } from '@/components/store/QuickAdd';
import { SizeGuideDialog } from '@/components/store/SizeGuideDialog';
import { StoreHydrator } from '@/store/hydrator';
import { Toaster } from '@/components/ui/sonner';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ellane.store'),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.name} is an elevated streetwear and contemporary casuals brand. Heavyweight denim, structured jackets, 380 GSM oversized hoodies, and everyday essentials.`,
  keywords: [
    'ELLANE',
    'Streetwear India',
    'Baggy Jeans',
    'Oversized Hoodies',
    'Men Fashion',
    'Drop Shoulder T-Shirts',
    'Anime Inspired Streetwear',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ellane.store',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: `Elevate Your Outfits with ${SITE.name}. Baggy jeans, structured outerwear, and premium streetwear casuals.`,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: `Elevate Your Outfits with ${SITE.name}.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: SITE.name,
    description: SITE.tagline,
    url: 'https://ellane.store',
    telephone: `+91-${SITE.phone}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address,
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560001',
      addressCountry: 'IN',
    },
    openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 11:00-21:30',
    sameAs: [SITE.instagramUrl],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-black antialiased flex flex-col font-sans">
        <StoreHydrator />
        <AnnouncementBar />
        <Header />
        <MobileMenu />

        <main className="flex-1">{children}</main>

        <Footer />

        {/* Global Modals & Notifications */}
        <CartDrawer />
        <SearchDialog />
        <QuickAddModal />
        <SizeGuideDialog />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
