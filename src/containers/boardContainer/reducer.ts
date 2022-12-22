import {
  calculateAvailableCells,
  checkIsCellInsideABoard,
  generateCells,
  generateCheckers,
  isPositionsEqual,
} from "utils/index";
import { Cell, Checker } from "../../types/index";

export interface GameState {
  cells: Cell[];
  checkers: Checker[];
  activeChecker: Checker | null;
}

export const initialState: GameState = {
  cells: [],
  checkers: [],
  activeChecker: null,
};

export const ACTIONS = {
  SELECT_ACTION: "SELECT_ACTION",
  SELECT_CELL: "SELECT_CELL",
} as const;

export type SelectCheckerAction = {
  type: typeof ACTIONS.SELECT_ACTION;
  payload: {
    id: string;
  };
};

export type SelectCellAction = {
  type: typeof ACTIONS.SELECT_CELL;
  payload: {
    cell: Cell;
  };
};

export type Action = SelectCheckerAction | SelectCellAction;

export function initializeGame(): GameState {
  const checkers = generateCheckers();

  return {
    cells: generateCells(checkers),
    checkers,
    activeChecker: null,
  };
}

export function gameStateReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case ACTIONS.SELECT_ACTION: {
      const { id } = action.payload;
      let activeChecker = state.activeChecker;

      if (state.activeChecker?.id === id) {
        return { ...state };
      }

      const updatedCheckers = state.checkers.map((checker) => {
        if (checker.id === id) {
          if (checker.isActive) {
            activeChecker = null;
          } else {
            activeChecker = checker;
          }
        }

        return {
          ...checker,
          isActive: checker.isActive ? false : checker.id === id,
        };
      });
      let availableCellPositions = calculateAvailableCells(activeChecker);
      availableCellPositions = availableCellPositions.filter(
        checkIsCellInsideABoard
      );

      const updatedCells = state.cells.map((cell) => {
        const updatedCell = { ...cell };
        const isCellAvailable = availableCellPositions.find((position) =>
          isPositionsEqual(position, updatedCell.position)
        );

        updatedCell.isSelectable = isCellAvailable && !cell.isLocked;

        return updatedCell;
      });

      return { cells: updatedCells, checkers: updatedCheckers, activeChecker };
    }
    case ACTIONS.SELECT_CELL: {
      const { cell } = action.payload;
      let activeChecker = state.activeChecker;
      const updatedCheckers = state.checkers.map((checker) => {
        return {
          ...checker,
          isActive: false,
          position:
            checker.id === activeChecker?.id
              ? { ...cell.position }
              : { ...checker.position },
        };
      });
      activeChecker = null;

      const updatedCells = state.cells.map((cell) => {
        const isLocked = Boolean(
          updatedCheckers.find((checker) =>
            isPositionsEqual(checker.position, cell.position)
          )
        );

        return { ...cell, isLocked, isSelectable: false };
      });

      return { cells: updatedCells, checkers: updatedCheckers, activeChecker };
    }
    default:
      throw new Error("Wrong action type");
  }
}
