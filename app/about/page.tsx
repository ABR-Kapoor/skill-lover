import { LiquidGlass } from "@/components/ui/liquid-glass";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full relative">
        <LiquidGlass />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white drop-shadow-lg mb-4">
                About Me
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto drop-shadow-md">
                Passionate about building AI-powered tools that empower careers. 
                Focusing on beautiful, functional, and user-centric design.
            </p>
        </div>
    </div>
  );
}
