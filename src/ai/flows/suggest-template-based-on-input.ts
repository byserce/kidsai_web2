'use server';
/**
 * @fileOverview This file defines a Genkit flow to suggest the most relevant privacy policy template based on user input.
 *
 * - suggestTemplateBasedOnInput - A function that suggests a privacy policy template based on user input.
 * - SuggestTemplateInput - The input type for the suggestTemplateBasedOnInput function.
 * - SuggestTemplateOutput - The return type for the suggestTemplateBasedOnInput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTemplateInputSchema = z.object({
  businessType: z.string().describe('The type of business (e.g., e-commerce, SaaS, blog).'),
  dataHandlingPractices: z.string().describe('Description of the data handling practices of the business.'),
});
export type SuggestTemplateInput = z.infer<typeof SuggestTemplateInputSchema>;

const SuggestTemplateOutputSchema = z.object({
  templateSuggestion: z.string().describe('The suggested privacy policy template based on the input.'),
  reason: z.string().describe('The reasoning behind the template suggestion.'),
});
export type SuggestTemplateOutput = z.infer<typeof SuggestTemplateOutputSchema>;

export async function suggestTemplateBasedOnInput(input: SuggestTemplateInput): Promise<SuggestTemplateOutput> {
  return suggestTemplateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTemplatePrompt',
  input: {schema: SuggestTemplateInputSchema},
  output: {schema: SuggestTemplateOutputSchema},
  prompt: `Given the following information about a business and its data handling practices, suggest the most relevant privacy policy template and explain your reasoning.\n\nBusiness Type: {{{businessType}}}\nData Handling Practices: {{{dataHandlingPractices}}}\n\nTemplate Suggestion: \nReason:`,
});

const suggestTemplateFlow = ai.defineFlow(
  {
    name: 'suggestTemplateFlow',
    inputSchema: SuggestTemplateInputSchema,
    outputSchema: SuggestTemplateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

