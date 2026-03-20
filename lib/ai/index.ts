// Unified AI Client with multi-provider support and automatic fallback
// Supported providers: Claude (Anthropic), Gemini (Google), NVIDIA

export {
    generateContent,
    generateJSON,
    getAvailableProviders,
    hasAPIKey,
    type AIProvider,
    type AIProviderResult,
    type GenerateOptions,
} from './client';

export {
    callWithFallback,
    callProvider,
} from './providers';
