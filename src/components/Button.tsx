// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { type ElementType } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "../utils/cva";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 rounded-md px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

type ButtonOwnProps = VariantProps<typeof buttonVariants>;

export const Button = createPolymorphicComponent<"button", ButtonOwnProps>(
  ({ as: Tag = "button", asChild = false, variant, size, className, children, ...rest }) => {
    const Comp: any = asChild ? Slot : Tag;
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        {...rest}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };

export type ButtonProps<E extends ElementType = "button"> = PolymorphicProps<
  E,
  ButtonOwnProps
>;
