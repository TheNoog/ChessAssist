export type Piece = 'P' | 'N' | 'B' | 'R' | 'Q' | 'K' | 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
export type SquareState = Piece | null;
export type BoardState = SquareState[][];

export const PIECE_UNICODE: Record<Piece, string> = {
  'P': '♙', 'N': '♘', 'B': '♗', 'R': '♖', 'Q': '♕', 'K': '♔', // White
  'p': '♟', 'n': '♞', 'b': '♝', 'r': '♜', 'q': '♛', 'k': '♚', // Black
};

export const INITIAL_FEN_EMPTY = "8/8/8/8/8/8/8/8 w KQkq - 0 1";
export const INITIAL_FEN_STANDARD = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export function fenToBoard(fen: string): BoardState {
  const board: BoardState = Array(8).fill(null).map(() => Array(8).fill(null));
  const fenBoard = fen.split(' ')[0];
  const rows = fenBoard.split('/');

  for (let r = 0; r < rows.length; r++) {
    let file = 0;
    for (let char of rows[r]) {
      if (isNaN(parseInt(char))) {
        board[r][file] = char as Piece;
        file++;
      } else {
        file += parseInt(char);
      }
    }
  }
  return board;
}

export function boardToFen(board: BoardState): string {
  let fen = "";
  for (let r = 0; r < 8; r++) {
    let emptyCount = 0;
    for (let f = 0; f < 8; f++) {
      const piece = board[r][f];
      if (piece) {
        if (emptyCount > 0) {
          fen += emptyCount;
          emptyCount = 0;
        }
        fen += piece;
      } else {
        emptyCount++;
      }
    }
    if (emptyCount > 0) {
      fen += emptyCount;
    }
    if (r < 7) {
      fen += '/';
    }
  }
  // For simplicity, always assume white to move and default castling/en passant.
  // The AI flow primarily cares about piece placement.
  return `${fen} w KQkq - 0 1`;
}

export function algebraicToCoords(algebraic: string): { row: number, col: number } | null {
  if (algebraic.length !== 2) return null;
  const colChar = algebraic[0].toLowerCase();
  const rowChar = algebraic[1];

  const col = colChar.charCodeAt(0) - 'a'.charCodeAt(0);
  const row = 8 - parseInt(rowChar);

  if (col < 0 || col > 7 || row < 0 || row > 7 || isNaN(row)) return null;
  return { row, col };
}

export function coordsToAlgebraic(row: number, col: number): string {
  const colChar = String.fromCharCode('a'.charCodeAt(0) + col);
  const rowChar = (8 - row).toString();
  return `${colChar}${rowChar}`;
}

export function getPieceColor(piece: Piece): 'white' | 'black' {
  return piece === piece.toUpperCase() ? 'white' : 'black';
}
