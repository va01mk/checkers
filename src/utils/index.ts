import {
  cellPadding,
  cellSize,
  endThreshold,
  initialFilledRowsPerPlayer,
  maxCheckerInRow,
  POSITIONS,
  startThreshold,
} from "../constants/index";
import {
  Board,
  Cell,
  CellColor,
  Checker,
  Players,
  Position,
} from "../types/index";

function getCell({
  color,
  id,
  position,
  isLocked,
  isSelectable = false,
}: {
  color: CellColor;
  id: string;
  position: Position;
  isLocked: boolean;
  isSelectable?: boolean;
}): Cell {
  return { color, id, position, isLocked, isSelectable: false };
}

export function generateCells(checkers: Checker[]): Cell[] {
  const cells: Cell[] = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isCellLight = i % 2 === 1 ? j % 2 === 1 : j % 2 === 0;
      const top = cellPadding + cellSize * i;
      const left = cellPadding + cellSize * j;
      const isLocked = Boolean(
        checkers.find((checker) => {
          return isPositionsEqual(checker.position, { top, left });
        })
      );

      cells.push(
        getCell({
          id: `${i}${j}`,
          color: isCellLight ? CellColor.Light : CellColor.Dark,
          position: {
            top,
            left,
          },
          isLocked,
        })
      );
    }
  }

  return cells;
}

export function generateCheckers(): Checker[] {
  const blackPlayerCheckers: Checker[] = [];
  let isFirstCellFilled = false;

  for (let row = 0; row < initialFilledRowsPerPlayer; row++) {
    for (let j = 0; j < maxCheckerInRow; j++) {
      const initialLeft = isFirstCellFilled
        ? cellPadding
        : cellPadding + cellSize;
      const newChecker: Checker = {
        id: `${Players.Black}${row}${j}`,
        player: Players.Black,
        position: {
          top: row * cellSize + cellPadding,
          left: initialLeft + j * cellSize * 2,
        },
      };
      blackPlayerCheckers.push(newChecker);
    }
    isFirstCellFilled = !isFirstCellFilled;
  }

  const whitePlayerCheckers: Checker[] = [];
  isFirstCellFilled = true;

  for (let row = 0; row < initialFilledRowsPerPlayer; row++) {
    for (let j = 0; j < maxCheckerInRow; j++) {
      const initialTop = 5 * cellSize;
      const initialLeft = isFirstCellFilled
        ? cellPadding
        : cellPadding + cellSize;
      const newChecker: Checker = {
        id: `${Players.White}${row}${j}`,
        player: Players.White,
        position: {
          top: initialTop + row * cellSize + cellPadding,
          left: initialLeft + j * cellSize * 2,
        },
      };
      blackPlayerCheckers.push(newChecker);
    }
    isFirstCellFilled = !isFirstCellFilled;
  }

  return [...blackPlayerCheckers, ...whitePlayerCheckers];
}

export function getTopLeft({ top, left }: Position): Position {
  return {
    top: top - 40,
    left: left - 40,
  };
}

export function getTopRight({ top, left }: Position): Position {
  return {
    top: top - 40,
    left: left + 40,
  };
}

export function getBottomLeft({ top, left }: Position): Position {
  return {
    top: top + 40,
    left: left - 40,
  };
}

export function getBottomRight({ top, left }: Position): Position {
  return {
    top: top + 40,
    left: left + 40,
  };
}

export function isPositionsEqual(
  { top: top1, left: left1 }: Position,
  { top: top2, left: left2 }: Position
): boolean {
  return top1 === top2 && left1 === left2;
}

export function calculateAvailableCells(checker: Checker) {
  const { player, position } = checker;

  const topRight = getTopRight(position);
  const topLeft = getTopLeft(position);
  const bottomRight = getBottomRight(position);
  const bottomLeft = getBottomLeft(position);

  return [topRight, topLeft, bottomRight, bottomLeft];
}

export function checkIsCellInsideABoard({ top, left }: Position): boolean {
  return (
    top >= startThreshold &&
    top <= endThreshold &&
    left >= startThreshold &&
    left <= endThreshold
  );
}
