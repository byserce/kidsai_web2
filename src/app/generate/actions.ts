'use server';

import { 
  generatePrivacyPolicyFromInput, 
  GeneratePrivacyPolicyInput,
  GeneratePrivacyPolicyOutput
} from '@/ai/flows/generate-privacy-policy-from-input';
import { 
  summarizePrivacyPolicy, 
  SummarizePrivacyPolicyInput,
  SummarizePrivacyPolicyOutput
} from '@/ai/flows/summarize-privacy-policy';

export async function generatePolicyAction(input: GeneratePrivacyPolicyInput): Promise<GeneratePrivacyPolicyOutput> {
  try {
    const result = await generatePrivacyPolicyFromInput(input);
    if (!result || !result.privacyPolicy) {
        throw new Error("AI failed to generate a valid policy.");
    }
    return result;
  } catch (error) {
    console.error('Error in generatePolicyAction:', error);
    // Return a structured error or an empty policy to be handled by the client
    return { privacyPolicy: '' };
  }
}

export async function summarizePolicyAction(input: SummarizePrivacyPolicyInput): Promise<SummarizePrivacyPolicyOutput> {
  try {
    const result = await summarizePrivacyPolicy(input);
    if (!result || !result.summary) {
        throw new Error("AI failed to generate a valid summary.");
    }
    return result;
  } catch (error) {
    console.error('Error in summarizePolicyAction:', error);
    return { summary: 'Özet oluşturulurken bir hata oluştu.' };
  }
}
