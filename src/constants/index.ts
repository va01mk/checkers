import { Players, Position } from "../types/index";

export const boardWidth = 320;
export const cellSize = 40;
export const checkSize = 30;

export const maxCheckerInRow = 4;
export const initialFilledRowsPerPlayer = 3;

export const cellPadding = 5;

export const startThreshold = 5;
export const endThreshold = 285;

export const POSITIONS: { [key in string]: Position } = {
  topLeft: {
    top: cellPadding,
    left: cellPadding,
  },
  topRight: {
    top: cellPadding,
    left: endThreshold,
  },
  bottomLeft: {
    top: endThreshold,
    left: cellPadding,
  },
  bottomRight: {
    top: endThreshold,
    left: endThreshold,
  },
} as const;

const directionTopMultiplier = {
  [Players.Black]: +1,
  [Players.White]: -1,
};
