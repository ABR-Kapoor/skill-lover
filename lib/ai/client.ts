import { callWithFallback, callProvider, AIProvider, AIProviderResult, getAvailableProviders } from './providers';

export interface GenerateOptions {
    provider?: AIProvider;
    forceProvider?: boolean;
}

/**
 * Generate content using AI with automatic fallback
 */
export async function generateContent(prompt: string, options?: GenerateOptions): Promise<string> {
    let result: AIProviderResult;

    if (options?.forceProvider && options.provider) {
        result = await callProvider(options.provider, prompt);
    } else {
        const preferredOrder = options?.provider
            ? [options.provider, ...getAvailableProviders().filter(p => p !== options.provider)]
            : undefined;
        result = await callWithFallback(prompt, preferredOrder);
    }

    if (!result.success) {
        throw new Error(result.error || 'Failed to generate content');
    }

    return result.text;
}

/**
 * Generate JSON content using AI with automatic fallback and parsing
 */
export async function generateJSON<T>(prompt: string, schema?: any, options?: GenerateOptions): Promise<T> {
    const text = await generateContent(prompt, options);

    // Remove markdown code blocks if present
    let jsonText = text.trim();

    // Method 1: Remove ```json ... ``` blocks
    if (jsonText.includes('```')) {
        const jsonMatch = jsonText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
        if (jsonMatch) {
            jsonText = jsonMatch[1].trim();
        } else {
            // Fallback: just remove all ``` markers
            jsonText = jsonText.replace(/```(?:json)?/g, '').trim();
        }
    }

    // Method 2: Extract JSON object if there's extra text
    if (!jsonText.startsWith('{') && !jsonText.startsWith('[')) {
        const jsonMatch = jsonText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
        if (jsonMatch) {
            jsonText = jsonMatch[1];
        }
    }

    try {
        const parsed = JSON.parse(jsonText);

        // If schema is provided, validate with it
        if (schema) {
            return schema.parse(parsed);
        }

        return parsed;
    } catch (error) {
        console.error('Failed to parse JSON. Raw response:', text.substring(0, 500));
        console.error('Extracted JSON text:', jsonText.substring(0, 500));
        console.error('Parse error:', error);
        throw new Error('Failed to parse AI response as JSON');
    }
}

// Re-export for convenience
export { getAvailableProviders, hasAPIKey } from './providers';
export type { AIProvider, AIProviderResult } from './providers';
