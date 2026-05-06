// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { type SVGProps } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "../utils/cn";

type IconProps = SVGProps<SVGSVGElement> & {
  icon: LucideIcon;
  size?: number;
  strokeWidth?: number;
  "aria-label"?: string;
};

export function Icon({
  icon: LucideIconComp,
  size = 16,
  strokeWidth = 2,
  className,
  "aria-label": ariaLabel,
  ...rest
}: IconProps) {
  return (
    <LucideIconComp
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      className={cn("shrink-0", className)}
      {...rest}
    />
  );
}
