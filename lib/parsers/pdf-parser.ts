/**
 * Extract text from PDF buffer
 * Note: This is a placeholder. Actual PDF parsing should be done client-side
 * or use a different library that's compatible with Next.js
 */
export async function parsePDF(buffer: Buffer): Promise<string> {
    try {
        // For now, return a message indicating PDF was uploaded
        // In production, you'd want to use a proper PDF parsing service
        // or handle this client-side with pdf.js
        return `PDF file uploaded successfully. File size: ${buffer.length} bytes.\n\nNote: For best results, please copy and paste your resume text directly, or the system will analyze the PDF structure.`;
    } catch (error) {
        console.error('PDF parsing error:', error);
        throw new Error('Failed to parse PDF file');
    }
}

/**
 * Extract text from PDF file (client-side version)
 * This should be called from the client component
 */
export async function parsePDFClient(file: File): Promise<string> {
    // Return file info for now
    // In a real implementation, you'd use pdf.js here
    return `PDF file: ${file.name} (${file.size} bytes)\n\nPlease paste your resume text for better analysis.`;
}

/**
 * Validate PDF file
 */
export function isPDF(filename: string): boolean {
    return filename.toLowerCase().endsWith('.pdf');
}
