import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        'm8-ads': 'bg-[#FC7459]/10 text-[#FC7459] border border-[#FC7459]/20',
        'm8-sight': 'bg-[#6895FC]/10 text-[#6895FC] border border-[#6895FC]/20',
        'm8-shelf': 'bg-[#6895FC]/10 text-[#6895FC] border border-[#6895FC]/20',
        'm8-returns': 'bg-[#52BFBC]/10 text-[#52BFBC] border border-[#52BFBC]/20',
        'm8-reco': 'bg-[#7CBC71]/10 text-[#7CBC71] border border-[#7CBC71]/20',
        'm8-inventory': 'bg-[#FCB24F]/10 text-[#FCB24F] border border-[#FCB24F]/20',
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
