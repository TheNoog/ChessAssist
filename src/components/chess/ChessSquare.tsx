import type { SquareState } from '@/lib/chess-utils';
import { ChessPiece } from './ChessPiece';
import { cn } from '@/lib/utils';

interface ChessSquareProps {
  row: number;
  col: number;
  piece: SquareState;
  isLightSquare: boolean;
  onClick: () => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  isDraggable?: boolean;
  highlight?: { type: 'move-from' | 'move-to'; number?: number };
}

export function ChessSquare({
  row,
  col,
  piece,
  isLightSquare,
  onClick,
  onDragOver,
  onDrop,
  onDragStart,
  isDraggable = false,
  highlight,
}: ChessSquareProps) {
  
  const squareColorClass = isLightSquare
    ? 'bg-[hsl(var(--board-light-square))]'
    : 'bg-[hsl(var(--board-dark-square))]';

  return (
    <div
      className={cn(
        'aspect-square flex justify-center items-center relative group transition-shadow duration-150',
        squareColorClass,
        'hover:shadow-inner hover:shadow-black/20 cursor-pointer'
      )}
      onClick={onClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
      data-row={row}
      data-col={col}
    >
      {piece && (
        <div draggable={isDraggable} onDragStart={onDragStart} className="cursor-grab active:cursor-grabbing">
          <ChessPiece piece={piece} />
        </div>
      )}
      {highlight && (
        <div
          className={cn(
            'absolute inset-0 flex justify-center items-center pointer-events-none',
            highlight.type === 'move-from' && 'bg-[hsla(var(--highlight-color),0.3)]',
            highlight.type === 'move-to' && 'bg-[hsla(var(--highlight-color),0.5)]'
          )}
        >
          {highlight.type === 'move-to' && highlight.number && (
            <span className="absolute z-10 flex items-center justify-center w-6 h-6 text-sm font-bold rounded-full bg-[hsl(var(--highlight-color))] text-[hsl(var(--accent-foreground))] shadow-md">
              {highlight.number}
            </span>
          )}
        </div>
      )}
       {/* Debugging coordinates 
        <div className="absolute top-0 left-0 text-xs text-gray-500 opacity-50">
         {row},{col}
       </div>
       */}
    </div>
  );
}
