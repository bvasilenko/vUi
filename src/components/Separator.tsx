import { type ElementType } from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

type SeparatorOwnProps = {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

export const Separator = createPolymorphicComponent<"hr", SeparatorOwnProps>(
  ({
    as: Tag = "hr",
    orientation = "horizontal",
    decorative = true,
    className,
    ...rest
  }) => (
    <Tag
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...rest}
    />
  )
);

Separator.displayName = "Separator";

export type SeparatorProps<E extends ElementType = "hr"> = PolymorphicProps<
  E,
  SeparatorOwnProps
>;
