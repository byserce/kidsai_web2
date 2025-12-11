'use server';

/**
 * @fileOverview Summarizes a privacy policy to extract key points.
 *
 * - summarizePrivacyPolicy - A function that summarizes a privacy policy.
 * - SummarizePrivacyPolicyInput - The input type for the summarizePrivacyPolicy function.
 * - SummarizePrivacyPolicyOutput - The return type for the summarizePrivacyPolicy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePrivacyPolicyInputSchema = z.object({
  privacyPolicyText: z
    .string()
    .describe('The full text of the privacy policy to summarize.'),
});

export type SummarizePrivacyPolicyInput = z.infer<
  typeof SummarizePrivacyPolicyInputSchema
>;

const SummarizePrivacyPolicyOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the privacy policy.'),
});

export type SummarizePrivacyPolicyOutput = z.infer<
  typeof SummarizePrivacyPolicyOutputSchema
>;

export async function summarizePrivacyPolicy(
  input: SummarizePrivacyPolicyInput
): Promise<SummarizePrivacyPolicyOutput> {
  return summarizePrivacyPolicyFlow(input);
}

const summarizePrivacyPolicyPrompt = ai.definePrompt({
  name: 'summarizePrivacyPolicyPrompt',
  input: {schema: SummarizePrivacyPolicyInputSchema},
  output: {schema: SummarizePrivacyPolicyOutputSchema},
  prompt: `Summarize the following privacy policy, extracting the key points:

  {{{privacyPolicyText}}}`,
});

const summarizePrivacyPolicyFlow = ai.defineFlow(
  {
    name: 'summarizePrivacyPolicyFlow',
    inputSchema: SummarizePrivacyPolicyInputSchema,
    outputSchema: SummarizePrivacyPolicyOutputSchema,
  },
  async input => {
    const {output} = await summarizePrivacyPolicyPrompt(input);
    return output!;
  }
);
