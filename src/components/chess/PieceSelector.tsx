import type { Piece } from '@/lib/chess-utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, LucideIcon, Castle, Church, ToyBrick, Circle, Eraser, Gem } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SelectablePiece = Piece | 'empty';

interface PieceOption {
  id: SelectablePiece;
  name: string;
  Icon: LucideIcon;
  iconColor?: string;
  iconStroke?: string;
}

const pieceOptions: PieceOption[] = [
  // White pieces
  { id: 'K', name: 'White King', Icon: Crown, iconColor: 'hsl(var(--piece-white-fill))', iconStroke: 'hsl(var(--piece-outline-dark))' },
  { id: 'Q', name: 'White Queen', Icon: Gem, iconColor: 'hsl(var(--piece-white-fill))', iconStroke: 'hsl(var(--piece-outline-dark))' },
  { id: 'R', name: 'White Rook', Icon: Castle, iconColor: 'hsl(var(--piece-white-fill))', iconStroke: 'hsl(var(--piece-outline-dark))' },
  { id: 'B', name: 'White Bishop', Icon: Church, iconColor: 'hsl(var(--piece-white-fill))', iconStroke: 'hsl(var(--piece-outline-dark))' },
  { id: 'N', name: 'White Knight', Icon: ToyBrick, iconColor: 'hsl(var(--piece-white-fill))', iconStroke: 'hsl(var(--piece-outline-dark))' },
  { id: 'P', name: 'White Pawn', Icon: Circle, iconColor: 'hsl(var(--piece-white-fill))', iconStroke: 'hsl(var(--piece-outline-dark))' },
  // Black pieces
  { id: 'k', name: 'Black King', Icon: Crown, iconColor: 'hsl(var(--piece-black-fill))', iconStroke: 'hsl(var(--piece-outline-light))' },
  { id: 'q', name: 'Black Queen', Icon: Gem, iconColor: 'hsl(var(--piece-black-fill))', iconStroke: 'hsl(var(--piece-outline-light))' },
  { id: 'r', name: 'Black Rook', Icon: Castle, iconColor: 'hsl(var(--piece-black-fill))', iconStroke: 'hsl(var(--piece-outline-light))' },
  { id: 'b', name: 'Black Bishop', Icon: Church, iconColor: 'hsl(var(--piece-black-fill))', iconStroke: 'hsl(var(--piece-outline-light))' },
  { id: 'n', name: 'Black Knight', Icon: ToyBrick, iconColor: 'hsl(var(--piece-black-fill))', iconStroke: 'hsl(var(--piece-outline-light))' },
  { id: 'p', name: 'Black Pawn', Icon: Circle, iconColor: 'hsl(var(--piece-black-fill))', iconStroke: 'hsl(var(--piece-outline-light))' },
  // Eraser
  { id: 'empty', name: 'Eraser', Icon: Eraser, iconColor: 'hsl(var(--foreground))' },
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
          {pieceOptions.map((option) => (
            <Button
              key={option.id}
              variant={selectedPiece === option.id ? 'default' : 'outline'}
              size="lg"
              onClick={() => onSelectPiece(selectedPiece === option.id ? null : option.id)}
              className={cn(
                "flex flex-col items-center justify-center h-20 p-2 transition-all",
                selectedPiece === option.id && "ring-2 ring-[hsl(var(--ring))] shadow-md"
              )}
              aria-label={option.name}
              title={option.name}
            >
              <option.Icon
                className="w-8 h-8 mb-1"
                color={option.iconColor}
                stroke={option.iconStroke}
                strokeWidth={option.id !== 'empty' && option.id !== 'P' && option.id !== 'p' ? 1.5 : 2} // Thicker stroke for Pawns (Circle)
                fill={option.id !== 'empty' ? (option.Icon === Circle ? option.iconColor : 'transparent') : 'transparent'} // Fill Pawns
              />
              <span className="text-xs truncate">{option.name.split(' ')[1] || option.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
