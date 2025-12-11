'use server';
/**
 * @fileOverview A privacy policy generation AI agent.
 *
 * - generatePrivacyPolicyFromInput - A function that handles the privacy policy generation process.
 * - GeneratePrivacyPolicyInput - The input type for the generatePrivacyPolicyFromInput function.
 * - GeneratePrivacyPolicyOutput - The return type for the generatePrivacyPolicyFromInput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePrivacyPolicyInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  websiteURL: z.string().describe('The URL of the website.'),
  dataCollectionPractices: z.string().describe('Description of the data collection practices.'),
  dataUsagePractices: z.string().describe('Description of the data usage practices.'),
  dataSharingPractices: z.string().describe('Description of the data sharing practices.'),
  dataSecurityMeasures: z.string().describe('Description of the data security measures.'),
  userRights: z.string().describe('Description of user rights regarding their data.'),
  contactInformation: z.string().describe('Contact information for privacy inquiries.'),
  effectiveDate: z.string().describe('The effective date of the privacy policy.'),
});
export type GeneratePrivacyPolicyInput = z.infer<typeof GeneratePrivacyPolicyInputSchema>;

const GeneratePrivacyPolicyOutputSchema = z.object({
  privacyPolicy: z.string().describe('The generated privacy policy.'),
});
export type GeneratePrivacyPolicyOutput = z.infer<typeof GeneratePrivacyPolicyOutputSchema>;

export async function generatePrivacyPolicyFromInput(input: GeneratePrivacyPolicyInput): Promise<GeneratePrivacyPolicyOutput> {
  return generatePrivacyPolicyFromInputFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePrivacyPolicyFromInputPrompt',
  input: {schema: GeneratePrivacyPolicyInputSchema},
  output: {schema: GeneratePrivacyPolicyOutputSchema},
  prompt: `You are an expert legal writer specializing in privacy policy generation.

  Based on the information provided, generate a comprehensive and customized privacy policy.

  Company Name: {{{companyName}}}
  Website URL: {{{websiteURL}}}
  Data Collection Practices: {{{dataCollectionPractices}}}
  Data Usage Practices: {{{dataUsagePractices}}}
  Data Sharing Practices: {{{dataSharingPractices}}}
  Data Security Measures: {{{dataSecurityMeasures}}}
  User Rights: {{{userRights}}}
  Contact Information: {{{contactInformation}}}
  Effective Date: {{{effectiveDate}}}

  Privacy Policy:`, // No Handlebars logic such as {{#if}} or {{#each}} is allowed.
});

const generatePrivacyPolicyFromInputFlow = ai.defineFlow(
  {
    name: 'generatePrivacyPolicyFromInputFlow',
    inputSchema: GeneratePrivacyPolicyInputSchema,
    outputSchema: GeneratePrivacyPolicyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
