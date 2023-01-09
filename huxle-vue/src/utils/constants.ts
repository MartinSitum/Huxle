const maxRows: number = 6; // max number of rows
const maxIndex: number = 5; // max word length
const rows = [
  "qwertyuiop".split(""),
  "asdfghjkl".split(""),
  ["Enter", ..."zxcvbnm".split(""), "Backspace"],
];
const rowsFlat = rows.flat(1);

export default { maxRows, maxIndex, rows, rowsFlat };
