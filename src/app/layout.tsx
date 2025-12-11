import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Gizlilik Kalkanı',
  description: 'Yapay zeka destekli gizlilik politikası oluşturucu',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={cn("font-body bg-background text-foreground antialiased", inter.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
