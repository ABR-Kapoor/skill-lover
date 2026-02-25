import { LucideIcon } from 'lucide-react';
import { NeuCard } from '@/components/ui/neu-card';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <NeuCard variant="flat" className="flex flex-col items-center justify-center py-16 px-4 text-center bg-surface-base dark:bg-[#161B28] border-dashed border-2 border-surface-shadow/50">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center mb-6 shadow-inner">
        <Icon className="h-10 w-10 text-primary/80" />
      </div>
      <h3 className="text-xl font-display font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">{description}</p>
      {action && <div>{action}</div>}
    </NeuCard>
  );
}
