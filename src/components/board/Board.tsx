import React, { MouseEvent } from "react";
import { Board as BoardType, Cell as CellType } from "types/index";

import { Cell } from "../cell/index";

import "./styles.css";

interface BoardProps extends BoardType {
  children: React.ReactElement | React.ReactElement[];
  handleCellClick: (cell: CellType, e: MouseEvent<HTMLDivElement>) => void;
}

export default function Board({
  cells,
  children,
  handleCellClick,
}: BoardProps) {
  return (
    <div className="board-wrapper">
      <div className="board">
        {cells.map((cell) => (
          <Cell
            {...cell}
            key={cell.id}
            onClick={(e) => handleCellClick(cell, e)}
          />
        ))}
        {children}
      </div>
    </div>
  );
}
