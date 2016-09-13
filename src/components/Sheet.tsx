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

export const Sheet = buildOverlayRoot(Ctx);
Sheet.displayName = "Sheet";

export const SheetTrigger = buildOverlayTrigger(useOverlayContext);
SheetTrigger.displayName = "SheetTrigger";

export const SheetContent = buildOverlayContent(useOverlayContext, {
  role: "dialog",
  "aria-modal": "true",
  className:
    "fixed inset-y-0 right-0 z-50 h-full w-3/4 gap-4 border-l bg-background p-6 shadow-lg sm:max-w-sm",
});
SheetContent.displayName = "SheetContent";

export const SheetClose = buildOverlayClose(useOverlayContext);
SheetClose.displayName = "SheetClose";

export type { OverlayRootProps as SheetProps, OverlayContentProps as SheetContentProps };
