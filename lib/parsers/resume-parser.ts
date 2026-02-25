import { extractTextFromPDF, isPDF as isPDFFile } from './pdf-extractor';
import { parseDOCX, isDOCX } from './docx-parser';

/**
 * Parse resume file and extract text
 */
export async function parseResume(file: File): Promise<string> {
    if (isPDFFile(file)) {
        console.log('Extracting text from PDF using PDF.js...');
        return await extractTextFromPDF(file);
    } else if (isDOCX(file.name)) {
        console.log('Extracting text from DOCX...');
        const buffer = Buffer.from(await file.arrayBuffer());
        return await parseDOCX(buffer);
    } else {
        throw new Error('Unsupported file format. Please upload PDF or DOCX.');
    }
}

/**
 * Validate resume file type
 */
export function isValidResumeFile(file: File | string): boolean {
    if (typeof file === 'string') {
        return file.toLowerCase().endsWith('.pdf') || isDOCX(file);
    }
    return isPDFFile(file) || isDOCX(file.name);
}

/**
 * Get supported file extensions
 */
export function getSupportedExtensions(): string[] {
    return ['.pdf', '.docx', '.doc'];
}

/**
 * Clean and normalize extracted text
 */
export function cleanResumeText(text: string): string {
    return text
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newline
        .trim();
}
