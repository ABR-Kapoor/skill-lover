/**
 * Simple PDF text extractor for client-side only
 * This avoids SSR issues with pdfjs-dist
 */

/**
 * Extract text from PDF file using browser's built-in capabilities
 * For production, you'd want to use a server-side PDF parsing service
 */
export async function extractTextFromPDF(file: File): Promise<string> {
    try {
        console.log('📄 Attempting PDF text extraction...');

        // For now, we'll use a simple approach that works in the browser
        // In production, you'd use a proper PDF parsing library or service

        // Read file as text (this works for some simple PDFs)
        const text = await file.text();

        if (text && text.length > 100) {
            console.log(`✅ Extracted ${text.length} characters from PDF`);
            return text;
        }

        // If that didn't work, return a helpful message
        console.log('⚠️ Could not extract text automatically');
        return `PDF File Uploaded: ${file.name}\n\nSize: ${(file.size / 1024).toFixed(2)} KB\n\nNote: For best ATS analysis results, please paste your resume text directly below. PDF text extraction is limited in the browser.`;

    } catch (error) {
        console.error('❌ PDF extraction error:', error);
        return `PDF File: ${file.name}\n\nPlease paste your resume text for analysis.\n\nFile Size: ${(file.size / 1024).toFixed(2)} KB`;
    }
}

/**
 * Check if file is PDF
 */
export function isPDF(file: File): boolean {
    return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}
