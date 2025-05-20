import React, { useState, useEffect, useCallback } from 'react';
import { Chessboard, type HighlightedSquareInfo } from './Chessboard';
import { PieceSelector, type SelectablePiece } from './PieceSelector';
import type { BoardState, SquareState, Piece } from '@/lib/chess-utils';
import { fenToBoard, boardToFen, INITIAL_FEN_EMPTY, INITIAL_FEN_STANDARD, algebraicToCoords } from '@/lib/chess-utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, RotateCcw } from 'lucide-react';
import type { AnalyseBoardPositionOutput } from '@/ai/flows/analyse-board-position'; // Assuming this type exists
import { cn } from '@/lib/utils';

interface BoardEditorProps {
  initialFen?: string;
  onFenChange: (fen: string) => void;
  analysisOutput: AnalyseBoardPositionOutput | null;
  className?: string;
}

export function BoardEditor({ initialFen = INITIAL_FEN_STANDARD, onFenChange, analysisOutput, className }: BoardEditorProps) {
  const [board, setBoard] = useState<BoardState>(() => fenToBoard(initialFen));
  const [selectedPiece, setSelectedPiece] = useState<SelectablePiece | null>(null);

  useEffect(() => {
    // Update board if initialFen prop changes externally (e.g. parent resets)
    setBoard(fenToBoard(initialFen));
  }, [initialFen]);
  
  const updateBoardAndFen = useCallback((newBoard: BoardState) => {
    setBoard(newBoard);
    onFenChange(boardToFen(newBoard));
  }, [onFenChange]);

  const handleSquareClick = (row: number, col: number) => {
    if (selectedPiece) {
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = selectedPiece === 'empty' ? null : selectedPiece as Piece;
      updateBoardAndFen(newBoard);
    }
  };

  const handlePieceDrop = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    if (fromRow === toRow && fromCol === toCol) return; // No change
    const newBoard = board.map(r => [...r]);
    const pieceToMove = newBoard[fromRow][fromCol];
    newBoard[toRow][toCol] = pieceToMove;
    newBoard[fromRow][fromCol] = null;
    updateBoardAndFen(newBoard);
  };

  const clearBoard = () => {
    updateBoardAndFen(fenToBoard(INITIAL_FEN_EMPTY));
    onFenChange(INITIAL_FEN_EMPTY); // Ensure parent is notified immediately
  };

  const resetBoard = () => {
    updateBoardAndFen(fenToBoard(INITIAL_FEN_STANDARD));
    onFenChange(INITIAL_FEN_STANDARD); // Ensure parent is notified immediately
  };
  
  const [highlightedSquares, setHighlightedSquares] = useState<HighlightedSquareInfo[]>([]);

  useEffect(() => {
    if (analysisOutput) {
      const highlights: HighlightedSquareInfo[] = [];
      analysisOutput.forEach((moveData, index) => {
        const moveStr = moveData.move;
        // Expected format e.g. e2e4, Nf3, O-O
        // For simplicity, assuming basic from-to format like "e2e4"
        // More robust parsing would be needed for full algebraic notation (Nf3, O-O, etc.)
        if (moveStr.length === 4 || moveStr.length === 5) { // e.g. e2e4 or e7e8q
          const fromAlg = moveStr.substring(0, 2);
          const toAlg = moveStr.substring(2, 4);
          const fromCoords = algebraicToCoords(fromAlg);
          const toCoords = algebraicToCoords(toAlg);

          if (fromCoords) {
            highlights.push({ ...fromCoords, type: 'move-from' });
          }
          if (toCoords) {
            highlights.push({ ...toCoords, type: 'move-to', number: index + 1 });
          }
        }
      });
      setHighlightedSquares(highlights);
    } else {
      setHighlightedSquares([]);
    }
  }, [analysisOutput]);


  return (
    <Card className={cn("flex flex-col overflow-hidden shadow-xl", className)}>
      <CardHeader>
        <CardTitle className="text-xl">Board Editor</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col lg:flex-row gap-4 p-4">
        <div className="lg:w-1/3 flex flex-col gap-4">
          <PieceSelector selectedPiece={selectedPiece} onSelectPiece={setSelectedPiece} />
          <div className="grid grid-cols-2 gap-2 mt-auto">
            <Button variant="outline" onClick={clearBoard} className="w-full">
              <Trash2 className="mr-2 h-4 w-4" /> Clear Board
            </Button>
            <Button variant="outline" onClick={resetBoard} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset Board
            </Button>
          </div>
        </div>
        <div className="lg:w-2/3 flex justify-center items-center">
          <Chessboard 
            board={board} 
            onSquareClick={handleSquareClick}
            onPieceDrop={handlePieceDrop}
            highlightedSquares={highlightedSquares}
            draggablePieces={!selectedPiece} // Only allow dragging if no piece is selected for placement
          />
        </div>
      </CardContent>
    </Card>
  );
}
