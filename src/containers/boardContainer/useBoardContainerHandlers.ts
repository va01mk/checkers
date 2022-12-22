import { useReducer, MouseEvent } from "react";

import { Cell } from "types/index";

import {
  gameStateReducer,
  initialState,
  initializeGame,
  ACTIONS,
} from "./reducer";

export default function useBoardContainerHandlers() {
  const [gameState, dispatch] = useReducer(
    gameStateReducer,
    initialState,
    initializeGame
  );
  const { cells, checkers, activeChecker } = gameState;
  const handleCheckerClick = (id: string) => {
    dispatch({ type: ACTIONS.SELECT_ACTION, payload: { id } });
  };
  const handleCellClick = (cell: Cell, e: MouseEvent<HTMLDivElement>) => {
    if (!cell.isSelectable) {
      e.preventDefault();
      return;
    }

    dispatch({
      type: ACTIONS.SELECT_CELL,
      payload: {
        cell,
      },
    });
  };

  return { cells, checkers, handleCheckerClick, handleCellClick };
}
