export enum KeyState {
  INITIAL = "",
  CORRECT = "correct",
  EXISTING = "existing",
  NONEXISTING = "nonexisting",
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
