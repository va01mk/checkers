import React from "react";

import "./styles.css";

import { Checker as CheckerType, Players } from "../../types/index";

interface CheckerProps extends CheckerType {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isActive?: boolean;
}

export default function Checker({
  player,
  position: { left, top },
  onClick,
  isActive = false,
}: CheckerProps) {
  return (
    <div
      style={{
        top,
        left,
      }}
      className={`check ${
        player === Players.White ? "check-light" : "check-dark"
      } ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="check-center" />
    </div>
  );
}
