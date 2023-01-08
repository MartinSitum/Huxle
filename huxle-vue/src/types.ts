export enum KeyState {
  INITIAL,
  CORRECT,
  EXISTING,
  NONEXISTING,
}

export interface Letter {
  letter: string;
  state: KeyState;
  revealed: boolean;
}

export interface GuessBoxState {
  currentRow: number;
  guessBoxGrid: Letter[][];
}

export interface GuessLetterPosition {
  row: number;
  index: number;
}
