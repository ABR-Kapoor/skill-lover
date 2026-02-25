import { LiquidGlass } from "@/components/ui/liquid-glass";

const DemoOne = () => {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-white/10 shadow-2xl relative">
        <LiquidGlass />
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded">
            Liquid Glass Demo
        </div>
    </div>
  );
};

export { DemoOne };
