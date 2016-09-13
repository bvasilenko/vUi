import { type ElementType } from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

type GridOwnProps = {
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  rows?: 1 | 2 | 3 | 4 | 5 | 6;
};

const colsMap: Record<NonNullable<GridOwnProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

const rowsMap: Record<NonNullable<GridOwnProps["rows"]>, string> = {
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
  4: "grid-rows-4",
  5: "grid-rows-5",
  6: "grid-rows-6",
};

export const Grid = createPolymorphicComponent<"div", GridOwnProps>(
  ({ as: Tag = "div", columns, rows, className, children, ...rest }) => (
    <Tag
      className={cn(
        "grid",
        columns && colsMap[columns],
        rows && rowsMap[rows],
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
);

Grid.displayName = "Grid";

export type GridProps<E extends ElementType = "div"> = PolymorphicProps<
  E,
  GridOwnProps
>;
