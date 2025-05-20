"use client";

import React, { useState, useEffect } from 'react';
import { BoardEditor } from '@/components/chess/BoardEditor';
import { MoveAnalysisPanel } from '@/components/chess/MoveAnalysisPanel';
import { INITIAL_FEN_STANDARD } from '@/lib/chess-utils';
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
  const [analysisOutput, setAnalysisOutput] = useState<AnalyseBoardPositionOutput | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const { toast } = useToast();

  // Debounce FEN updates to avoid excessive re-renders or calls if needed elsewhere
  // For now, direct update is fine as BoardEditor handles its internal state primarily.
  const handleFenChange = (newFen: string) => {
    setFen(newFen);
    // If FEN changes, analysis for previous FEN is invalid
    setAnalysisOutput(null); 
  };

  const handleAnalyse = async () => {
    setIsLoadingAnalysis(true);
    setAnalysisOutput(null); 
    try {
      // The AI flow expects only the piece placement part of FEN
      const piecePlacementFen = fen.split(' ')[0];
      const result = await analyseBoardPosition(piecePlacementFen);
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
  
  // Ensure client-side only execution for dynamic parts if needed,
  // but useState already makes it client-side.
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or a loading spinner, to avoid hydration mismatches
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
                              <p>3. <strong>Analyse:</strong> Once your position is set, click 'Analyse Position'. The AI will suggest the top 3 moves.</p>
                              <p>4. <strong>View results:</strong> Suggested moves appear on the right, and are highlighted on the board with numbered indicators.</p>
                            </div>
                          ),
                          duration: 15000, // Longer duration for help text
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
              />
            </div>
            <Separator orientation="vertical" className="hidden lg:block h-auto" />
            <div className="lg:w-[40%] xl:w-[35%]">
              <MoveAnalysisPanel
                analysisOutput={analysisOutput}
                isLoading={isLoadingAnalysis}
                onAnalyseRequest={handleAnalyse}
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
