import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={cn("font-body bg-background text-foreground antialiased", inter.variable)}>
      <Header />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default MyApp;
