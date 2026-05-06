// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { type ElementType } from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

export const Label = createPolymorphicComponent<"label">(
  ({ as: Tag = "label", className, children, ...rest }) => (
    <Tag
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
);

Label.displayName = "Label";

export type LabelProps<E extends ElementType = "label"> = PolymorphicProps<E>;
