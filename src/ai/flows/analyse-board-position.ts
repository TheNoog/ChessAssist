'use server';
/**
 * @fileOverview Analyzes a given chess board position and suggests the top 3 best moves.
 *
 * - analyseBoardPosition - A function that analyzes the board position.
 * - AnalyseBoardPositionInput - The input type for the analyseBoardPosition function.
 * - AnalyseBoardPositionOutput - The return type for the analyseBoardPosition function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyseBoardPositionInputSchema = z.string().describe('FEN representation of the board position.');
export type AnalyseBoardPositionInput = z.infer<typeof AnalyseBoardPositionInputSchema>;

const AnalyseBoardPositionOutputSchema = z.array(
  z.object({
    move: z.string().describe('The recommended move in algebraic notation.'),
    score: z.number().describe('The evaluation score of the move (e.g., +0.2, -0.1).'),
  })
).length(3).describe('An array of the top 3 moves with their scores.');
export type AnalyseBoardPositionOutput = z.infer<typeof AnalyseBoardPositionOutputSchema>;

export async function analyseBoardPosition(input: AnalyseBoardPositionInput): Promise<AnalyseBoardPositionOutput> {
  return analyseBoardPositionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyseBoardPositionPrompt',
  input: {schema: AnalyseBoardPositionInputSchema},
  output: {schema: AnalyseBoardPositionOutputSchema},
  prompt: `You are a world-class chess grandmaster, and will suggest the top 3 best moves for a given chess board position.

  Analyze the following chess board position in FEN notation and provide the top 3 best moves with their corresponding scores. Always respond with the top 3 moves, even if the position is bad.

  Board position (FEN): {{{$input}}}
  Output in JSON format the top 3 moves with their scores. Here is the schema: {{$output}}`,
});

const analyseBoardPositionFlow = ai.defineFlow(
  {
    name: 'analyseBoardPositionFlow',
    inputSchema: AnalyseBoardPositionInputSchema,
    outputSchema: AnalyseBoardPositionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
