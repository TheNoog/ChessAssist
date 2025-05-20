
import type { Piece } from '@/lib/chess-utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, LucideIcon, Castle, Church, ToyBrick, Circle, Eraser, Gem } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SelectablePiece = Piece | 'empty';

interface PieceOption {
  id: SelectablePiece;
  name: string;
  Icon: LucideIcon;
  originalIconColor: string; 
  originalIconStroke?: string;
}

const pieceOptions: PieceOption[] = [
  // White pieces
  { id: 'K', name: 'White King', Icon: Crown, originalIconColor: 'hsl(var(--piece-white-fill))', originalIconStroke: 'hsl(var(--piece-outline-dark))' },
  { id: 'Q', name: 'White Queen', Icon: Gem, originalIconColor: 'hsl(var(--piece-white-fill))', originalIconStroke: 'hsl(var(--piece-outline-dark))' },
  { id: 'R', name: 'White Rook', Icon: Castle, originalIconColor: 'hsl(var(--piece-white-fill))', originalIconStroke: 'hsl(var(--piece-outline-dark))' },
  { id: 'B', name: 'White Bishop', Icon: Church, originalIconColor: 'hsl(var(--piece-white-fill))', originalIconStroke: 'hsl(var(--piece-outline-dark))' },
  { id: 'N', name: 'White Knight', Icon: ToyBrick, originalIconColor: 'hsl(var(--piece-white-fill))', originalIconStroke: 'hsl(var(--piece-outline-dark))' },
  { id: 'P', name: 'White Pawn', Icon: Circle, originalIconColor: 'hsl(var(--piece-white-fill))', originalIconStroke: 'hsl(var(--piece-outline-dark))' },
  // Black pieces
  { id: 'k', name: 'Black King', Icon: Crown, originalIconColor: 'hsl(var(--piece-black-fill))', originalIconStroke: 'hsl(var(--piece-outline-light))' },
  { id: 'q', name: 'Black Queen', Icon: Gem, originalIconColor: 'hsl(var(--piece-black-fill))', originalIconStroke: 'hsl(var(--piece-outline-light))' },
  { id: 'r', name: 'Black Rook', Icon: Castle, originalIconColor: 'hsl(var(--piece-black-fill))', originalIconStroke: 'hsl(var(--piece-outline-light))' },
  { id: 'b', name: 'Black Bishop', Icon: Church, originalIconColor: 'hsl(var(--piece-black-fill))', originalIconStroke: 'hsl(var(--piece-outline-light))' },
  { id: 'n', name: 'Black Knight', Icon: ToyBrick, originalIconColor: 'hsl(var(--piece-black-fill))', originalIconStroke: 'hsl(var(--piece-outline-light))' },
  { id: 'p', name: 'Black Pawn', Icon: Circle, originalIconColor: 'hsl(var(--piece-black-fill))', originalIconStroke: 'hsl(var(--piece-outline-light))' },
  // Eraser
  { id: 'empty', name: 'Eraser', Icon: Eraser, originalIconColor: 'hsl(var(--foreground))' }, // Eraser uses originalIconColor for its stroke
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
            const isWhitePiece = ['K', 'Q', 'R', 'B', 'N', 'P'].includes(option.id);
            const isBlackPiece = ['k', 'q', 'r', 'b', 'n', 'p'].includes(option.id);

            let iconFill: string;
            let iconStroke: string;

            if (isWhitePiece) {
              iconFill = option.originalIconColor; 
              iconStroke = option.originalIconStroke!;
            } else if (isBlackPiece) {
              iconFill = option.originalIconColor; 
              iconStroke = option.originalIconStroke!; 
            } else { // Eraser
              iconFill = 'transparent';
              iconStroke = option.originalIconColor; 
            }
            
            return (
              <Button
                key={option.id}
                variant={isSelected ? 'default' : 'outline'}
                size="lg" 
                onClick={() => onSelectPiece(isSelected ? null : option.id)}
                className={cn(
                  "flex flex-col items-center justify-center h-20 p-2 transition-all", 
                  isSelected && "ring-2 ring-[hsl(var(--ring))] shadow-md",
                  isWhitePiece && !isSelected && 
                    "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80 hover:text-secondary-foreground"
                )}
                aria-label={option.name}
                title={option.name}
              >
                <option.Icon
                  className="w-8 h-8 mb-1"
                  stroke={iconStroke}
                  strokeWidth={option.id === 'empty' ? 2 : 1.5} // All pieces 1.5, eraser 2
                  fill={iconFill}
                />
                <span className="text-xs truncate">{option.name.split(' ')[1] || option.name}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
