import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/clerk/server';
import PDFParser from 'pdf2json';

export async function POST(req: Request) {
    try {
        await requireAuth();

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
        }

        console.log('📄 Extracting text from:', file.name, 'Type:', file.type);

        let extractedText = '';

        // Handle PDF files
        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                console.log('📖 Parsing PDF with pdf2json...');

                // Create promise-based wrapper for pdf2json
                extractedText = await new Promise<string>((resolve, reject) => {
                    const pdfParser = new (PDFParser as any)(null, 1);

                    pdfParser.on('pdfParser_dataError', (errData: any) => {
                        console.error('PDF Parser Error:', errData.parserError);
                        reject(new Error('Failed to parse PDF'));
                    });

                    pdfParser.on('pdfParser_dataReady', () => {
                        try {
                            const rawText = (pdfParser as any).getRawTextContent();
                            resolve(rawText);
                        } catch (err) {
                            reject(err);
                        }
                    });

                    // Parse the buffer
                    pdfParser.parseBuffer(buffer);
                });

                console.log(`✅ Extracted ${extractedText.length} characters from PDF`);
                console.log('📝 Preview:', extractedText.substring(0, 200));

            } catch (pdfError) {
                console.error('❌ PDF parsing error:', pdfError);
                return NextResponse.json(
                    { success: false, error: 'Failed to parse PDF. Please try pasting the text instead.' },
                    { status: 400 }
                );
            }
        }
        // Handle DOCX files
        else if (file.name.toLowerCase().endsWith('.docx')) {
            try {
                const mammoth = await import('mammoth');
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                console.log('📖 Parsing DOCX with mammoth...');
                const result = await mammoth.extractRawText({ buffer });

                extractedText = result.value;
                console.log(`✅ Extracted ${extractedText.length} characters from DOCX`);

            } catch (docxError) {
                console.error('❌ DOCX parsing error:', docxError);
                return NextResponse.json(
                    { success: false, error: 'Failed to parse DOCX file.' },
                    { status: 400 }
                );
            }
        }
        else {
            return NextResponse.json(
                { success: false, error: 'Unsupported file type. Please upload PDF or DOCX.' },
                { status: 400 }
            );
        }

        // Validate extracted text
        if (!extractedText || extractedText.length < 50) {
            return NextResponse.json(
                { success: false, error: 'Could not extract enough text from file. Please paste your resume text instead.' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                text: extractedText,
                filename: file.name,
                length: extractedText.length,
            },
        });

    } catch (error: any) {
        console.error('❌ Text extraction error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to extract text from file' },
            { status: 500 }
        );
    }
}
