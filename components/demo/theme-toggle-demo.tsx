import { ThemeToggle } from "@/components/ui/theme-toggle"

function DefaultToggle() {
  return (
    <div className="space-y-4 text-center p-8 border rounded-xl bg-gray-100 dark:bg-zinc-900 border-dashed border-gray-300 dark:border-zinc-700">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Theme Toggle Demo</h3>
      <div className="flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  )
}

export { DefaultToggle }
