import { ReactNode } from 'react';
import { GlassHeader } from '@/components/ui/glass-header';
import { FloatingNav } from '@/components/ui/floating-nav';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GlassHeader />
      <main className="flex-1 pt-24 pb-24 container mx-auto px-4">
        {children}
      </main>
      <FloatingNav />
    </div>
  );
}
