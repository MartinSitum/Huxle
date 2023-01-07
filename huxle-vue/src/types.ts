export enum KeyState {
  INITIAL,
  CORRECT,
  EXISTING,
  NONEXISTING,
}

export interface Letter {
  letter: string;
  state: KeyState;
}

export interface GuessBoxState {
  currentRow: number;
  guessBoxGrid: Letter[][];
}

export interface GuessLetterPosition {
  row: number;
  index: number;
}
