import mammoth from 'mammoth';

/**
 * Extract text from DOCX buffer
 */
export async function parseDOCX(buffer: Buffer): Promise<string> {
    try {
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
    } catch (error) {
        console.error('DOCX parsing error:', error);
        throw new Error('Failed to parse DOCX file');
    }
}

/**
 * Validate DOCX file
 */
export function isDOCX(filename: string): boolean {
    const lower = filename.toLowerCase();
    return lower.endsWith('.docx') || lower.endsWith('.doc');
}
