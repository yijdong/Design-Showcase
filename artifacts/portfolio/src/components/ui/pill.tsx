import { cn } from "@/lib/utils";

interface PillProps {
  children: React.ReactNode;
  className?: string;
}

export function Pill({ children, className }: PillProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-border bg-card text-foreground/80 shadow-sm",
      className
    )}>
      {children}
    </span>
  );
}
