import type { BoardState, SquareState } from '@/lib/chess-utils';
import { ChessSquare } from './ChessSquare';

export interface HighlightedSquareInfo {
  row: number;
  col: number;
  type: 'move-from' | 'move-to';
  number?: number;
}

interface ChessboardProps {
  board: BoardState;
  onSquareClick: (row: number, col: number) => void;
  onPieceDrop?: (fromRow: number, fromCol: number, toRow: number, toCol: number) => void;
  highlightedSquares?: HighlightedSquareInfo[];
  draggablePieces?: boolean;
}

export function Chessboard({ 
  board, 
  onSquareClick, 
  onPieceDrop, 
  highlightedSquares = [],
  draggablePieces = false
}: ChessboardProps) {
  const [draggingPiece, setDraggingPiece] = React.useState<{row: number, col: number} | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, row: number, col: number) => {
    if (!draggablePieces) return;
    setDraggingPiece({row, col});
    e.dataTransfer.effectAllowed = "move";
    // Minimal data to make it draggable in Firefox
    e.dataTransfer.setData("text/plain", `${row},${col}`); 
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, toRow: number, toCol: number) => {
    e.preventDefault();
    if (draggingPiece && onPieceDrop) {
      onPieceDrop(draggingPiece.row, draggingPiece.col, toRow, toCol);
    }
    setDraggingPiece(null);
  };

  return (
    <div className="grid grid-cols-8 w-full max-w-[calc(100vh-12rem)] md:max-w-xl lg:max-w-2xl aspect-square border-2 border-[hsl(var(--primary))] shadow-xl rounded overflow-hidden bg-[hsl(var(--board-dark-square))]">
      {board.map((rowState, rowIndex) =>
        rowState.map((piece, colIndex) => {
          const highlight = highlightedSquares.find(
            (h) => h.row === rowIndex && h.col === colIndex
          );
          return (
            <ChessSquare
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              piece={piece}
              isLightSquare={(rowIndex + colIndex) % 2 !== 0}
              onClick={() => onSquareClick(rowIndex, colIndex)}
              onDragStart={(e) => handleDragStart(e, rowIndex, colIndex)}
              onDragOver={draggablePieces ? handleDragOver : undefined}
              onDrop={draggablePieces ? (e) => handleDrop(e, rowIndex, colIndex) : undefined}
              isDraggable={draggablePieces && !!piece}
              highlight={highlight}
            />
          );
        })
      )}
    </div>
  );
}
