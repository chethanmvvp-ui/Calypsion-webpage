import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ExpoBanner from '@/components/ExpoBanner';
import ScrollToTop from '@/components/ScrollToTop';
import GoBack from '@/components/GoBack';
import Footer from '@/components/Footer';
import { HydrationGuard } from '@/components/HydrationGuard';
import StableIndustrialBackground from '@/components/StableIndustrialBackground';
import { CustomCursor } from '@/components/CustomCursor';
import { ExpoProvider } from '@/context/ExpoContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calypsion | Industrial Intelligence',
  description: 'Connect your factory floor to predictive intelligence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ExpoProvider>
          <HydrationGuard>
            <CustomCursor />
            <StableIndustrialBackground />
          </HydrationGuard>
          <Sidebar />
          <div className="page-wrapper">
            <ExpoBanner />
            <Header />
            {children}
            <GoBack />
            <ScrollToTop />
            <Footer />
          </div>
        </ExpoProvider>
      </body>
    </html>
  );
}
