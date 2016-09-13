import {
  createOverlayContext,
  buildOverlayRoot,
  buildOverlayTrigger,
  buildOverlayContent,
  buildOverlayClose,
  type OverlayRootProps,
  type OverlayContentProps,
} from "./_overlay-base";

const { Ctx, useOverlayContext } = createOverlayContext();

export const Popover = buildOverlayRoot(Ctx);
Popover.displayName = "Popover";

export const PopoverTrigger = buildOverlayTrigger(useOverlayContext);
PopoverTrigger.displayName = "PopoverTrigger";

export const PopoverContent = buildOverlayContent(useOverlayContext, {
  role: "dialog",
  "aria-modal": false,
  className:
    "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
});
PopoverContent.displayName = "PopoverContent";

export const PopoverClose = buildOverlayClose(useOverlayContext);
PopoverClose.displayName = "PopoverClose";

export type { OverlayRootProps as PopoverProps, OverlayContentProps as PopoverContentProps };
