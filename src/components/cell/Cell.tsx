import React, { MouseEventHandler } from "react";

import { Cell as CellType, CellColor } from "types/index";

import "./styles.css";

interface CellProps extends CellType {
  onClick: MouseEventHandler<HTMLDivElement>
}

export default function Cell({ color, isSelectable, onClick }: CellProps) {
  return (
    <div
      className={`cell ${
        color === CellColor.Light ? "light-cell" : "dark-cell"
      } ${isSelectable ? "selectable-cell" : ""}`}
      onClick={onClick}
    />
  );
}
