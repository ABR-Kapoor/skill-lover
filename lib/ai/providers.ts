import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

export type AIProvider = 'claude' | 'gemini' | 'nvidia';

export interface AIConfig {
    provider: AIProvider;
    model: string;
    temperature: number;
    maxTokens: number;
}

export interface AIProviderResult {
    success: boolean;
    text: string;
    provider: AIProvider;
    error?: string;
}

// Provider configurations - using fast models to avoid timeouts
const PROVIDER_CONFIGS: Record<AIProvider, AIConfig> = {
    claude: {
        provider: 'claude',
        model: 'claude-3-5-haiku-20241022', // Fast model to avoid timeout
        temperature: 0.7,
        maxTokens: 8192,
    },
    gemini: {
        provider: 'gemini',
        model: 'gemini-2.0-flash', // Fast model
        temperature: 0.7,
        maxTokens: 8192,
    },
    nvidia: {
        provider: 'nvidia',
        model: 'meta/llama-3.1-70b-instruct', // Smaller, faster model
        temperature: 0.7,
        maxTokens: 8192,
    },
};

// Check if API key exists for a provider
export function hasAPIKey(provider: AIProvider): boolean {
    switch (provider) {
        case 'claude':
            return !!process.env.ANTHROPIC_API_KEY;
        case 'gemini':
            return !!process.env.GEMINI_API_KEY;
        case 'nvidia':
            return !!process.env.NVIDIA_API_KEY;
        default:
            return false;
    }
}

// Get available providers in order of preference
export function getAvailableProviders(): AIProvider[] {
    const providers: AIProvider[] = ['claude', 'gemini', 'nvidia'];
    return providers.filter(hasAPIKey);
}

// Claude API call
async function callClaude(prompt: string, config: AIConfig): Promise<AIProviderResult> {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return { success: false, text: '', provider: 'claude', error: 'ANTHROPIC_API_KEY not set' };
    }

    try {
        const client = new Anthropic({ apiKey });

        const response = await client.messages.create({
            model: config.model,
            max_tokens: config.maxTokens,
            temperature: config.temperature,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });

        const textContent = response.content.find((c) => c.type === 'text');
        if (!textContent || textContent.type !== 'text') {
            return { success: false, text: '', provider: 'claude', error: 'No text content in response' };
        }

        return { success: true, text: textContent.text, provider: 'claude' };
    } catch (error: any) {
        console.error('[Claude] API Error:', error.message);
        return { success: false, text: '', provider: 'claude', error: error.message };
    }
}

// Gemini API call
async function callGemini(prompt: string, config: AIConfig): Promise<AIProviderResult> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return { success: false, text: '', provider: 'gemini', error: 'GEMINI_API_KEY not set' };
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: config.model,
            generationConfig: {
                temperature: config.temperature,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: config.maxTokens,
                responseMimeType: 'application/json',
            },
        });

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        return { success: true, text, provider: 'gemini' };
    } catch (error: any) {
        console.error('[Gemini] API Error:', error.message);
        return { success: false, text: '', provider: 'gemini', error: error.message };
    }
}

// NVIDIA API call (OpenAI-compatible endpoint)
async function callNvidia(prompt: string, config: AIConfig): Promise<AIProviderResult> {
    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
        return { success: false, text: '', provider: 'nvidia', error: 'NVIDIA_API_KEY not set' };
    }

    try {
        const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: config.model,
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                temperature: config.temperature,
                max_tokens: config.maxTokens,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`NVIDIA API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || '';

        return { success: true, text, provider: 'nvidia' };
    } catch (error: any) {
        console.error('[NVIDIA] API Error:', error.message);
        return { success: false, text: '', provider: 'nvidia', error: error.message };
    }
}

// Call a specific provider
export async function callProvider(
    provider: AIProvider,
    prompt: string,
    configOverrides?: Partial<AIConfig>
): Promise<AIProviderResult> {
    const config = { ...PROVIDER_CONFIGS[provider], ...configOverrides };

    switch (provider) {
        case 'claude':
            return callClaude(prompt, config);
        case 'gemini':
            return callGemini(prompt, config);
        case 'nvidia':
            return callNvidia(prompt, config);
        default:
            return { success: false, text: '', provider, error: 'Unknown provider' };
    }
}

// Call with automatic fallback
export async function callWithFallback(
    prompt: string,
    preferredOrder?: AIProvider[]
): Promise<AIProviderResult> {
    const providers = preferredOrder || getAvailableProviders();

    if (providers.length === 0) {
        return {
            success: false,
            text: '',
            provider: 'claude',
            error: 'No AI providers configured. Please set at least one API key (ANTHROPIC_API_KEY, GEMINI_API_KEY, or NVIDIA_API_KEY)',
        };
    }

    let lastError = '';
    for (const provider of providers) {
        if (!hasAPIKey(provider)) {
            console.log(`[AI] Skipping ${provider} - no API key`);
            continue;
        }

        console.log(`[AI] Trying ${provider}...`);
        const result = await callProvider(provider, prompt);

        if (result.success) {
            console.log(`[AI] Success with ${provider}`);
            return result;
        }

        lastError = result.error || 'Unknown error';
        console.log(`[AI] ${provider} failed: ${lastError}, trying next provider...`);
    }

    return {
        success: false,
        text: '',
        provider: providers[providers.length - 1] || 'claude',
        error: `All providers failed. Last error: ${lastError}`,
    };
}
