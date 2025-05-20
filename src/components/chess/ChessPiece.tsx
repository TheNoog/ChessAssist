
import type { Piece } from '@/lib/chess-utils';
import { PIECE_UNICODE, getPieceColor } from '@/lib/chess-utils';
import { cn } from '@/lib/utils';

interface ChessPieceProps {
  piece: Piece;
  size?: 'small' | 'medium' | 'large';
  overrideColor?: 'white' | 'black';
}

export function ChessPiece({ piece, size = 'medium', overrideColor }: ChessPieceProps) {
  const baseColor = getPieceColor(piece);
  const displayColor = overrideColor || baseColor;
  const unicode = PIECE_UNICODE[piece];

  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl md:text-5xl',
    large: 'text-6xl',
  };

  return (
    <span
      aria-label={`${displayColor} ${piece.toLowerCase()}`}
      className={cn(
        'select-none transition-all duration-100 ease-in-out',
        sizeClasses[size],
        displayColor === 'white' 
          ? 'text-[hsl(var(--piece-white-fill))] [text-shadow:_0_0_2px_hsl(var(--piece-outline-dark)),_-1px_-1px_0_hsl(var(--piece-outline-dark)),_1px_-1px_0_hsl(var(--piece-outline-dark)),_-1px_1px_0_hsl(var(--piece-outline-dark)),_1px_1px_0_hsl(var(--piece-outline-dark))]'
          : 'text-[hsl(var(--piece-black-fill))] [text-shadow:_0_0_2px_hsl(var(--piece-outline-light)),_-1px_-1px_0_hsl(var(--piece-outline-light)),_1px_-1px_0_hsl(var(--piece-outline-light)),_-1px_1px_0_hsl(var(--piece-outline-light)),_1px_1px_0_hsl(var(--piece-outline-light))]',
      )}
    >
      {unicode}
    </span>
  );
}
