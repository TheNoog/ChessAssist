import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Corrected import
import './globals.css';
import { cn } from '@/lib/utils';

const geistSans = Geist({ // Corrected usage
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({ // Corrected usage
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ChessAssist - AI Powered Chess Analysis',
  description: 'Interactive chess board editor and AI move analysis tool. Setup positions and get top move suggestions.',
  keywords: 'chess, analysis, AI, board editor, FEN, PGN, strategy, tactics, genkit, nextjs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geistSans.variable,
          geistMono.variable
        )}>
        {children}
      </body>
    </html>
  );
}
