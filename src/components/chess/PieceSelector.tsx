
import { ChessPiece } from './ChessPiece';
import type { Piece } from '@/lib/chess-utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eraser, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SelectablePiece = Piece | 'empty';

interface PieceOption {
  id: SelectablePiece;
  name: string;
  pieceDef?: Piece; // Actual piece character like 'K', 'p'
  LucideIcon?: LucideIcon; // For non-piece icons like Eraser
}

const pieceOptions: PieceOption[] = [
  // White pieces
  { id: 'K', name: 'White King', pieceDef: 'K' },
  { id: 'Q', name: 'White Queen', pieceDef: 'Q' },
  { id: 'R', name: 'White Rook', pieceDef: 'R' },
  { id: 'B', name: 'White Bishop', pieceDef: 'B' },
  { id: 'N', name: 'White Knight', pieceDef: 'N' },
  { id: 'P', name: 'White Pawn', pieceDef: 'P' },
  // Black pieces
  { id: 'k', name: 'Black King', pieceDef: 'k' },
  { id: 'q', name: 'Black Queen', pieceDef: 'q' },
  { id: 'r', name: 'Black Rook', pieceDef: 'r' },
  { id: 'b', name: 'Black Bishop', pieceDef: 'b' },
  { id: 'n', name: 'Black Knight', pieceDef: 'n' },
  { id: 'p', name: 'Black Pawn', pieceDef: 'p' },
  // Eraser
  { id: 'empty', name: 'Eraser', LucideIcon: Eraser },
];

interface PieceSelectorProps {
  selectedPiece: SelectablePiece | null;
  onSelectPiece: (piece: SelectablePiece | null) => void;
  className?: string;
}

export function PieceSelector({ selectedPiece, onSelectPiece, className }: PieceSelectorProps) {
  return (
    <Card className={cn("shadow-lg", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Select Piece</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {pieceOptions.map((option) => {
            const isSelected = selectedPiece === option.id;
            // Determine if it's a white piece for styling the button background
            const isWhitePieceButton = !!option.pieceDef && option.pieceDef === option.pieceDef.toUpperCase();
            
            return (
              <Button
                key={option.id}
                variant={isSelected ? 'default' : 'outline'}
                onClick={() => onSelectPiece(isSelected ? null : option.id)}
                className={cn(
                  "flex flex-col items-center justify-center h-20 p-2 transition-all", 
                  isSelected && "ring-2 ring-[hsl(var(--ring))] shadow-md",
                  isWhitePieceButton && !isSelected && 
                    "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80 hover:text-secondary-foreground"
                )}
                aria-label={option.name}
                title={option.name}
              >
                {option.pieceDef ? (
                  <ChessPiece piece={option.pieceDef} size="medium" />
                ) : option.LucideIcon ? (
                  <option.LucideIcon
                    className="w-8 h-8" // Standard size for Lucide icon
                    stroke={'hsl(var(--foreground))'} // Eraser stroke color
                    strokeWidth={2} // Eraser stroke width
                    fill="transparent"
                  />
                ) : null}
                <span className="text-xs mt-2 truncate">{option.name.split(' ')[1] || option.name}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
