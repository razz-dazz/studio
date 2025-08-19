// src/ai/flows/suggest-shot.ts
'use server';
/**
 * @fileOverview A flow for suggesting optimal pool shots based on the current table state, ball positions, and player skill level.
 *
 * - suggestShot - A function that handles the shot suggestion process.
 * - SuggestShotInput - The input type for the suggestShot function.
 * - SuggestShotOutput - The return type for the suggestShot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestShotInputSchema = z.object({
  tableStateDescription: z
    .string()
    .describe('A detailed text description of the current pool table state, including the positions of all balls, the cue ball, and any obstacles.'),
  playerSkillLevel: z
    .string()
    .describe(
      'The player’s skill level, which can be beginner, intermediate, or expert. This will influence the complexity of the suggested shot.'
    ),
});
export type SuggestShotInput = z.infer<typeof SuggestShotInputSchema>;

const SuggestShotOutputSchema = z.object({
  suggestedShotDescription: z
    .string()
    .describe(
      'A detailed description of the suggested shot, including the target ball, the aiming point, the amount of power to use, and any potential risks or complications.'
    ),
  diagramDataUri: z
    .string()
    .optional()
    .describe(
      'An optional diagram, as a data URI that must include a MIME type and use Base64 encoding, illustrating the suggested shot. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected description
    ),
});
export type SuggestShotOutput = z.infer<typeof SuggestShotOutputSchema>;

export async function suggestShot(input: SuggestShotInput): Promise<SuggestShotOutput> {
  return suggestShotFlow(input);
}

const suggestShotPrompt = ai.definePrompt({
  name: 'suggestShotPrompt',
  input: {schema: SuggestShotInputSchema},
  output: {schema: SuggestShotOutputSchema},
  prompt: `You are an expert pool player and instructor. Analyze the current table state and provide a detailed shot suggestion for the player.

Consider the player's skill level when making your suggestion. A beginner player should receive a simpler, safer shot suggestion, while an expert player can handle a more complex or risky shot.

Table State Description: {{{tableStateDescription}}}
Player Skill Level: {{{playerSkillLevel}}}

Based on this information, provide a detailed description of the suggested shot, including:
- The target ball
- The aiming point on the target ball
- The amount of power to use
- Any potential risks or complications

Output should conform to the JSON schema provided. If possible, generate a diagram illustrating the shot and include it as a data URI.
`,
});

const suggestShotFlow = ai.defineFlow(
  {
    name: 'suggestShotFlow',
    inputSchema: SuggestShotInputSchema,
    outputSchema: SuggestShotOutputSchema,
  },
  async input => {
    const {output} = await suggestShotPrompt(input);
    return output!;
  }
);
