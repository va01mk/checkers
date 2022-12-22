export enum CellColor {
  Dark,
  Light,
}

export enum Players {
  White,
  Black,
}

export interface Cell {
  color: CellColor;
  id: string;
  position: Position;
  isLocked: boolean; // cell that have checker on it
  isSelectable: boolean; // possible cell for active checker move
}

export interface Board {
  cells: Cell[];
}

export interface Position {
  top: number;
  left: number;
}

export interface Checker {
  id: string;
  player: Players;
  position: Position;
  isActive?: boolean; // currently selected & ready for move
}
