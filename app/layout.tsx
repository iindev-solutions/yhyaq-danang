import type {Metadata} from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yhyaq Danang 2026 | Ысыах в Дананге',
  description: 'Приглашение на национальный якутский праздник Ысыах в Дананге (Вьетнам): яркие игры, хоровод осуохай, музыкальное солнце и песчаный берег.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ru" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="font-sans bg-[#faf9f6] text-[#1c1c1c] antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
