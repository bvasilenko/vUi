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

export const Dialog = buildOverlayRoot(Ctx);
Dialog.displayName = "Dialog";

export const DialogTrigger = buildOverlayTrigger(useOverlayContext);
DialogTrigger.displayName = "DialogTrigger";

export const DialogContent = buildOverlayContent(useOverlayContext, {
  role: "dialog",
  "aria-modal": "true",
  className:
    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg",
});
DialogContent.displayName = "DialogContent";

export const DialogClose = buildOverlayClose(useOverlayContext);
DialogClose.displayName = "DialogClose";

export type { OverlayRootProps as DialogProps, OverlayContentProps as DialogContentProps };
