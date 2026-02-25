import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Get Gemini Pro model instance
 */
export function getGeminiModel() {
    return genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 32768, // Increased to 32k for very long roadmaps
            responseMimeType: 'application/json', // Force JSON response
        },
    });
}

/**
 * Generate content with Gemini
 */
export async function generateContent(prompt: string): Promise<string> {
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
}

export async function generateJSON<T>(prompt: string, schema?: any): Promise<T> {
    const text = await generateContent(prompt);

    // Remove markdown code blocks if present
    let jsonText = text.trim();

    // Try multiple extraction methods
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
