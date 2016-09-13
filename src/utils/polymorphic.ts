import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  type ElementType,
  type ReactElement,
  forwardRef,
} from "react";

export type PolymorphicRef<E extends ElementType> =
  ComponentPropsWithRef<E>["ref"];

type ProhibitedKeys<E extends ElementType, OwnProps> = keyof (OwnProps & {
  as?: E;
  asChild?: boolean;
});

export type PolymorphicProps<
  E extends ElementType,
  OwnProps = Record<never, never>,
> = OwnProps & { as?: E; asChild?: boolean } & Omit<
    ComponentPropsWithoutRef<E>,
    ProhibitedKeys<E, OwnProps>
  >;

export type PolymorphicPropsWithRef<
  E extends ElementType,
  OwnProps = Record<never, never>,
> = PolymorphicProps<E, OwnProps> & { ref?: PolymorphicRef<E> };

export type Polymorphic<
  E extends ElementType = "div",
  OwnProps = Record<never, never>,
> = PolymorphicPropsWithRef<E, OwnProps>;

type PolymorphicComponent<DefaultTag extends ElementType, OwnProps> = {
  <E extends ElementType = DefaultTag>(
    props: PolymorphicPropsWithRef<E, OwnProps>
  ): ReactElement | null;
  displayName?: string;
};

export function createPolymorphicComponent<
  DefaultTag extends ElementType,
  OwnProps = Record<never, never>,
>(
  render: (
    props: PolymorphicProps<DefaultTag, OwnProps> & {
      ref?: PolymorphicRef<DefaultTag>;
    }
  ) => ReactElement | null
): PolymorphicComponent<DefaultTag, OwnProps> {
  return forwardRef((props: any, ref: any) =>
    render(ref !== null ? { ...props, ref } : props)
  ) as unknown as PolymorphicComponent<DefaultTag, OwnProps>;
}
