// Match opponents of similar skill level.
'use server';

/**
 * @fileOverview Matches players with opponents of similar skill levels.
 *
 * - matchOpponent - A function that handles the opponent matching process.
 * - MatchOpponentInput - The input type for the matchOpponent function, including player skill level.
 * - MatchOpponentOutput - The return type for the matchOpponent function, including opponent details.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchOpponentInputSchema = z.object({
  playerSkillLevel: z
    .number()
    .describe('The skill level of the player, e.g., 1-100.'),
});
export type MatchOpponentInput = z.infer<typeof MatchOpponentInputSchema>;

const MatchOpponentOutputSchema = z.object({
  opponentDetails: z.object({
    opponentId: z.string().describe('The unique ID of the matched opponent.'),
    opponentSkillLevel: z
      .number()
      .describe('The skill level of the matched opponent.'),
    estimatedWaitTime: z
      .number()
      .describe('Estimated wait time in seconds to start the match.'),
  }),
});
export type MatchOpponentOutput = z.infer<typeof MatchOpponentOutputSchema>;

export async function matchOpponent(input: MatchOpponentInput): Promise<MatchOpponentOutput> {
  return matchOpponentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchOpponentPrompt',
  input: {schema: MatchOpponentInputSchema},
  output: {schema: MatchOpponentOutputSchema},
  prompt: `You are an AI matchmaker for a pro-pool game.  Given a player's skill level, find an appropriate opponent.

Find an opponent with a similar skill level to the player (specified in playerSkillLevel).  The estimated wait time should be short, but may be longer if the player's skill level is very high or very low.

Player Skill Level: {{{playerSkillLevel}}}
`,
});

const matchOpponentFlow = ai.defineFlow(
  {
    name: 'matchOpponentFlow',
    inputSchema: MatchOpponentInputSchema,
    outputSchema: MatchOpponentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
