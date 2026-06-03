import type {Metadata} from 'next';
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

export const metadata: Metadata = {
  title: 'Yhyaq Danang 2026 | Ысыах в Дананге',
  description: 'Приглашение на национальный якутский праздник Ысыах в Дананге (Вьетнам): яркие игры, хоровод осуохай, музыкальное солнце и веселье.',
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
