import './globals.css';

export const metadata = {
  title: 'Mykonos Parfum — Luxury Fragrance for Every Woman',
  description: 'Temukan koleksi parfum mewah Mykonos: Vanilla Clouds, Satin Blanc, Sparkling Rosé, dan Royal Ispahan. Wewangian premium dengan harga terjangkau.',
  keywords: 'parfum mykonos, parfum wanita, parfum mewah, vanilla clouds, satin blanc, sparkling rose, royal ispahan',
  openGraph: {
    title: 'Mykonos Parfum — Luxury Fragrance for Every Woman',
    description: 'Koleksi parfum eksklusif yang memadukan kelembutan, kemewahan, dan keanggunan dalam setiap tetes.',
    type: 'website',
  },
};

import FloatingWA from '@/components/FloatingWA/FloatingWA';

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <FloatingWA />
      </body>
    </html>
  );
}
