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
        'm8-ads': 'bg-m8-ads/10 text-m8-ads border-m8-ads/20 font-saira',
        'm8-sight': 'bg-m8-sight/10 text-m8-sight border-m8-sight/20 font-saira',
        'm8-shelf': 'bg-m8-shelf/10 text-m8-shelf border-m8-shelf/20 font-saira',
        'm8-returns': 'bg-m8-returns/10 text-m8-returns border-m8-returns/20 font-saira',
        'm8-reco': 'bg-m8-reco/10 text-m8-reco border-m8-reco/20 font-saira',
        'm8-inventory': 'bg-m8-inventory/10 text-m8-inventory border-m8-inventory/20 font-saira',
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
