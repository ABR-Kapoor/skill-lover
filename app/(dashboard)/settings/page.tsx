'use client';

import { UserProfile } from '@clerk/nextjs';
import { GlassPanel } from '@/components/ui/glass-panel';
import { PageHeader } from '@/components/shared/page-header';
import { Sparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { AuraButton } from '@/components/ui/aura-button';
import { Separator } from '@/components/ui/separator';

function SettingsThemeToggle() {
   const { theme, setTheme } = useTheme();
   return (
     <div className="flex items-center justify-between">
       <div className="space-y-1">
         <h4 className="font-medium">Appearance</h4>
         <p className="text-sm text-muted-foreground">Customize the interface theme</p>
       </div>
       <div className="flex bg-surface-base p-1 rounded-full border border-white/10">
          <button 
            onClick={() => setTheme('light')}
            className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
             <Sun className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setTheme('dark')}
            className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-surface-deep shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
             <Moon className="w-4 h-4" />
          </button>
       </div>
     </div>
   );
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <PageHeader
        title="Settings"
        description="Manage your account, preferences, and subscription."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Settings Panel */}
         <div className="lg:col-span-2 space-y-6">
            {/* Appearance & Subscription */}
            <GlassPanel variant="dark" className="p-6 space-y-6">
               <h3 className="text-xl font-bold font-display">Preferences</h3>
               <SettingsThemeToggle />
               
               <Separator className="bg-white/10" />

               <div className="flex items-center justify-between">
                 <div className="space-y-1">
                   <h4 className="font-medium flex items-center gap-2">
                     <Sparkles className="w-4 h-4 text-amber-500" /> Subscription Plan
                   </h4>
                   <p className="text-sm text-muted-foreground">You are currently on the Free Trial plan.</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-sm font-bold bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full border border-amber-500/20">
                      3 Credits Left
                    </span>
                    <AuraButton size="sm" variant="outline">Upgrade</AuraButton>
                 </div>
               </div>
            </GlassPanel>

            {/* Clerk User Profile */}
            <div className="clerk-profile-wrapper">
               <UserProfile routing="hash" />
            </div>
         </div>
      </div>
    </div>
  );
}
