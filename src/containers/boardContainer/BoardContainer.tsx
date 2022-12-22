import React from "react";

import { Board } from "components/board/index";
import { Checker } from "components/checker/index";
import useBoardContainerHandlers from "./useBoardContainerHandlers";

export default function BoardContainer() {
  const { cells, checkers, handleCheckerClick, handleCellClick } =
    useBoardContainerHandlers();

  return (
    <div>
      <Board cells={cells} handleCellClick={handleCellClick}>
        {checkers.map((checker) => {
          return (
            <Checker
              key={checker.id}
              {...checker}
              onClick={(e) => handleCheckerClick(checker.id)}
            />
          );
        })}
      </Board>
    </div>
  );
}
