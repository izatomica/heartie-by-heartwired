import type { ReactNode } from 'react';
import { Header } from './Header';

export interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
