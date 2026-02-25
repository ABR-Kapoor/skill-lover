interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground font-light">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
