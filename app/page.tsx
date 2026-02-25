import { GlassHeader } from '@/components/ui/glass-header';
import { FloatingNav } from '@/components/ui/floating-nav';
import { Footer } from '@/components/layout/footer';
import { ScrollVideo } from '@/components/landing/scroll-video';
import { ScrollExperience } from '@/components/landing/scroll-experience';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GlassHeader />
      <main className="flex-1">
        <ScrollVideo />
        <ScrollExperience />
      </main>
      <Footer />
      <FloatingNav />
    </div>
  );
}
