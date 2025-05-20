
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { BoardEditor } from '@/components/chess/BoardEditor';
import { MoveAnalysisPanel } from '@/components/chess/MoveAnalysisPanel';
import { INITIAL_FEN_STANDARD, fenToBoard } from '@/lib/chess-utils';
import { analyseBoardPosition, type AnalyseBoardPositionOutput } from '@/ai/flows/analyse-board-position';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Github, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ChessAssistPage() {
  const [fen, setFen] = useState(INITIAL_FEN_STANDARD);
  const [activeColor, setActiveColor] = useState<'w' | 'b'>('w');
  const [analysisOutput, setAnalysisOutput] = useState<AnalyseBoardPositionOutput | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const { toast } = useToast();

  const handleFenChange = useCallback((newFen: string) => {
    setFen(newFen);
    const parts = newFen.split(' ');
    if (parts.length > 1 && (parts[1] === 'w' || parts[1] === 'b')) {
      setActiveColor(parts[1]);
    }
    setAnalysisOutput(null); 
  }, []);

  const handleActiveColorChange = (color: 'w' | 'b') => {
    setActiveColor(color);
    // Update FEN to reflect new active color immediately
    const parts = fen.split(' ');
    if (parts.length > 1) {
      parts[1] = color;
      const newFen = parts.join(' ');
      if (newFen !== fen) {
         // only call setFen if it actually changes to avoid potential loop with handleFenChange
         setFen(newFen); 
      }
    }
     setAnalysisOutput(null); // New player to move invalidates old analysis
  };


  const handleAnalyse = async () => {
    setIsLoadingAnalysis(true);
    setAnalysisOutput(null); 
    try {
      const fenParts = fen.split(' ');
      let fenToSend = fen;

      if (fenParts.length > 1) {
        fenParts[1] = activeColor; // Ensure the activeColor from selector is used
         // Reconstruct other parts; use defaults if not present, though FEN from board editor should be complete
        const currentPiecePlacement = fenParts[0];
        const currentCastling = fenParts.length > 2 ? fenParts[2] : 'KQkq';
        const currentEnPassant = fenParts.length > 3 ? fenParts[3] : '-';
        const currentHalfMove = fenParts.length > 4 ? fenParts[4] : '0';
        const currentFullMove = fenParts.length > 5 ? fenParts[5] : '1';
        fenToSend = `${currentPiecePlacement} ${activeColor} ${currentCastling} ${currentEnPassant} ${currentHalfMove} ${currentFullMove}`;
      } else {
        // This case should ideally not happen if FEN is always well-formed
        fenToSend = `${fen} ${activeColor} KQkq - 0 1`;
      }
      
      const result = await analyseBoardPosition(fenToSend);
      setAnalysisOutput(result);
      if (result.length === 0) {
        toast({
          title: "Analysis Complete",
          description: "No specific moves suggested, or board might be in a terminal state.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Error",
        description: "Could not analyse the position. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoadingAnalysis(false);
  };
  
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    // Sync activeColor from initial FEN
    const parts = INITIAL_FEN_STANDARD.split(' ');
    if (parts.length > 1 && (parts[1] === 'w' || parts[1] === 'b')) {
      setActiveColor(parts[1]);
    }
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="p-4 border-b sticky top-0 bg-background/80 backdrop-blur-md z-50">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-accent"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path><path d="M20.13 9.53a4 4 0 0 1-4.26 7.9"></path><path d="M18 10v önemli değil.7"></path><path d="m22 13.5-4-1"></path><path d="m16 12.5 3.87 1.03"></path></svg>
              ChessAssist
            </h1>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="https://github.com/FirebaseExtended/genkit-samples/tree/main/nextjs-shadcn-chess" target="_blank" rel="noopener noreferrer" aria-label="View source code on GitHub">
                        <Github className="h-5 w-5" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Source on GitHub</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="ghost" size="icon" onClick={() => {
                        toast({
                          title: "How to Use ChessAssist",
                          description: (
                            <div className="space-y-2 text-sm">
                              <p>1. <strong>Set up the board:</strong> Click pieces from the 'Select Piece' panel, then click on the board to place them. Use the eraser to clear squares. You can also drag pieces on the board.</p>
                              <p>2. <strong>Board controls:</strong> Use 'Clear Board' to empty all squares or 'Reset Board' for the standard starting position.</p>
                              <p>3. <strong>Player to Move:</strong> Select 'White to move' or 'Black to move' in the Analysis Panel before analysing.</p>
                              <p>4. <strong>Analyse:</strong> Once your position and player to move are set, click 'Analyse Position'. The AI will suggest the top 3 moves.</p>
                              <p>5. <strong>View results:</strong> Suggested moves appear on the right, and are highlighted on the board with numbered indicators.</p>
                            </div>
                          ),
                          duration: 15000, 
                        });
                     }}>
                        <HelpCircle className="h-5 w-5" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Help & Usage Guide</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </header>
        
        <main className="flex-grow container mx-auto p-4">
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            <div className="lg:w-[60%] xl:w-[65%]">
              <BoardEditor
                initialFen={fen}
                onFenChange={handleFenChange}
                analysisOutput={analysisOutput}
                activeColor={activeColor}
              />
            </div>
            <Separator orientation="vertical" className="hidden lg:block h-auto" />
            <div className="lg:w-[40%] xl:w-[35%]">
              <MoveAnalysisPanel
                analysisOutput={analysisOutput}
                isLoading={isLoadingAnalysis}
                onAnalyseRequest={handleAnalyse}
                activeColor={activeColor}
                onActiveColorChange={handleActiveColorChange}
              />
            </div>
          </div>
        </main>
        <Toaster />
         <footer className="p-4 border-t mt-auto bg-muted/50">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
            <p>ChessAssist - Your AI-powered chess analysis partner. Built with Next.js, ShadCN/UI, and Genkit.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
