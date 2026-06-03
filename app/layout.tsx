import type {Metadata, Viewport} from 'next';
import localFont from 'next/font/local';
import './globals.css';

const abcGravity = localFont({
  src: '../assets/fonts/ABCGravityCyrillicVariable-Trial.ttf',
  variable: '--font-display',
  weight: '100 900',
  display: 'swap',
});

const suisseIntl = localFont({
  src: '../assets/fonts/suisse-intl-regular.ttf',
  variable: '--font-body',
  weight: '400',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#03402C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'YHYAQ Danang 2026 | Ысыах в Дананге',
  description: 'Ысыах - священный праздник солнца и единения народа Саха. Второй Ысыах в Дананге, Вьетнам - 20 июня. Хоровод Осуохай, Алгыс, игры Дыгына.',
  keywords: ['Ысыах', 'Yhyaq', 'Дананг', 'Саха', 'Осуохай', 'Алгыс', 'Вьетнам', 'этнофестиваль'],
  authors: [{name: 'iindev', url: 'https://iindev.xyz'}],
  openGraph: {
    title: 'YHYAQ Danang 2026 | Ысыах в Дананге',
    description: 'Ысыах - священный праздник солнца народа Саха. 20 июня, Дананг, Вьетнам.',
    url: 'https://yhyaq-danang.online',
    siteName: 'YHYAQ Danang',
    locale: 'ru_RU',
    type: 'website',
    images: [{url: '/web-app-manifest-512x512.png', width: 512, height: 512, alt: 'YHYAQ Danang 2026'}],
  },
  twitter: {
    card: 'summary',
    title: 'YHYAQ Danang 2026 | Ысыах в Дананге',
    description: 'Ысыах - священный праздник солнца народа Саха. 20 июня, Дананг.',
    images: ['/web-app-manifest-512x512.png'],
  },
  icons: {
    icon: [
      {url: '/favicon.svg', type: 'image/svg+xml'},
      {url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png'},
    ],
    shortcut: '/favicon.ico',
    apple: {url: '/apple-touch-icon.png', sizes: '180x180'},
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'yhyaq',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ru" className={`${abcGravity.variable} ${suisseIntl.variable} scroll-smooth`}>
      <body className="font-body bg-[#FFF3EB] text-[#0B0B26] antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
