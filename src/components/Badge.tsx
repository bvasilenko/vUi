import { type ElementType } from "react";
import { cva, type VariantProps } from "../utils/cva";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

type BadgeOwnProps = VariantProps<typeof badgeVariants>;

export const Badge = createPolymorphicComponent<"span", BadgeOwnProps>(
  ({ as: Tag = "span", variant, className, children, ...rest }) => (
    <Tag className={cn(badgeVariants({ variant }), className)} {...rest}>
      {children}
    </Tag>
  )
);

Badge.displayName = "Badge";

export { badgeVariants };

export type BadgeProps<E extends ElementType = "span"> = PolymorphicProps<
  E,
  BadgeOwnProps
>;
