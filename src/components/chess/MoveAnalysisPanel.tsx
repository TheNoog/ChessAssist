import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Loader2 } from 'lucide-react';
import type { AnalyseBoardPositionOutput } from '@/ai/flows/analyse-board-position';
import { cn } from '@/lib/utils';

interface MoveAnalysisPanelProps {
  analysisOutput: AnalyseBoardPositionOutput | null;
  isLoading: boolean;
  onAnalyseRequest: () => void;
  className?: string;
}

export function MoveAnalysisPanel({ analysisOutput, isLoading, onAnalyseRequest, className }: MoveAnalysisPanelProps) {
  return (
    <Card className={cn("flex flex-col shadow-xl", className)}>
      <CardHeader>
        <CardTitle className="text-xl">Position Analysis</CardTitle>
        <CardDescription>Get AI-powered move suggestions.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Loader2 className="h-12 w-12 animate-spin mb-4" />
            <p className="text-lg">Analysing position...</p>
          </div>
        ) : analysisOutput && analysisOutput.length > 0 ? (
          <ScrollArea className="h-[200px] sm:h-[300px] pr-4">
            <ul className="space-y-3">
              {analysisOutput.map((moveData, index) => (
                <li key={index} className="p-3 bg-secondary/50 rounded-md shadow-sm hover:bg-secondary transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-primary">
                      {index + 1}. {moveData.move}
                    </span>
                    <span className={cn(
                      "text-lg font-bold",
                      moveData.score > 0 && "text-green-600 dark:text-green-400",
                      moveData.score < 0 && "text-red-600 dark:text-red-400",
                      moveData.score === 0 && "text-muted-foreground"
                    )}>
                      {moveData.score > 0 ? '+' : ''}{moveData.score.toFixed(1)}
                    </span>
                  </div>
                  {/* Could add a brief text explanation here if the AI provided it */}
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Brain className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg">Set up a position and click "Analyse" to see the top moves.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onAnalyseRequest} disabled={isLoading} className="w-full text-base py-6">
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Brain className="mr-2 h-5 w-5" />
          )}
          Analyse Position
        </Button>
      </CardFooter>
    </Card>
  );
}
