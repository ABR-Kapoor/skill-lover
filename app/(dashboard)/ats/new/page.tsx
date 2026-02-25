'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { ResumeUploader } from '@/components/ats/resume-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { toast } from 'sonner';
import { cleanResumeText } from '@/lib/parsers/resume-parser';
import { Sparkles } from 'lucide-react';

export default function NewATSPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const handleAnalyze = async () => {
    // Check if we have either a file or pasted text
    if (!selectedFile && !resumeText.trim()) {
      toast.error('Please upload a resume or paste resume text');
      return;
    }

    setIsAnalyzing(true);

    try {
      let cleanedText = '';
      
      // Use pasted text if available, otherwise extract from file
      if (resumeText.trim()) {
        toast.info('Using pasted resume text...');
        cleanedText = cleanResumeText(resumeText);
      } else if (selectedFile) {
        // Step 1: Extract text from file using server-side API
        toast.info('Extracting text from file...');
        
        const extractFormData = new FormData();
        extractFormData.append('file', selectedFile);

        const extractRes = await fetch('/api/ats/extract-text', {
          method: 'POST',
          body: extractFormData,
        });

        if (!extractRes.ok) {
          const error = await extractRes.json();
          throw new Error(error.error || 'Failed to extract text from file');
        }

        const extractData = await extractRes.json();
        cleanedText = cleanResumeText(extractData.data.text);
        
        console.log('✅ Text extracted:', extractData.data.length, 'characters');
      }

      if (!cleanedText || cleanedText.length < 100) {
        toast.error('Resume text is too short. Please provide more detailed information.');
        setIsAnalyzing(false);
        return;
      }

      console.log('📝 Resume text length:', cleanedText.length);

      // Step 2: Upload to storage (optional)
      let uploadData = null;
      if (selectedFile) {
        toast.info('Uploading resume...');
        const formData = new FormData();
        formData.append('file', selectedFile);

        const uploadRes = await fetch('/api/ats/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          uploadData = await uploadRes.json();
        }
      }

      // Step 3: Analyze with AI
      toast.info('Analyzing with AI... This may take a moment');
      const analyzeRes = await fetch('/api/ats/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: cleanedText,
          resumeFilename: selectedFile?.name || 'Pasted Resume Text',
          resumeUrl: uploadData?.data?.url || null,
          jobDescription: jobDescription || undefined,
        }),
      });

      if (!analyzeRes.ok) {
        const error = await analyzeRes.json();
        if (analyzeRes.status === 402) {
          toast.error('Insufficient credits. Please purchase more credits.');
          router.push('/dashboard');
          return;
        }
        throw new Error(error.error || 'Analysis failed');
      }

      const analyzeData = await analyzeRes.json();

      toast.success('Analysis complete!');
      router.push(`/ats/${analyzeData.data.id}`);
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast.error(error.message || 'Failed to analyze resume');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Analyze Resume"
        description="Upload your resume for AI-powered ATS compatibility analysis"
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Primary Method: Paste Text */}
        <Card className="border-2 border-purple-500 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <CardTitle>Paste Resume Text (Recommended)</CardTitle>
            </div>
            <CardDescription>
              For best and most accurate results, paste your resume text directly below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="resume-text" className="text-base font-semibold">
                Resume Text *
              </Label>
              <Textarea
                id="resume-text"
                placeholder="Paste your complete resume text here...

Example:
JOHN SMITH
Email: john@email.com | Phone: (555) 123-4567
LinkedIn: linkedin.com/in/johnsmith

PROFESSIONAL SUMMARY
Senior Software Engineer with 8+ years of experience...

WORK EXPERIENCE
Senior Software Engineer | Google | 2020-Present
- Led team of 5 engineers...
- Improved system performance by 40%...

SKILLS
Python, JavaScript, React, Node.js, AWS, Docker...

EDUCATION
BS Computer Science | MIT | 2015"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={16}
                className="mt-2 font-mono text-sm"
                disabled={isAnalyzing}
              />
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  ✅ Why paste text?
                </p>
                <ul className="text-xs text-green-700 mt-2 space-y-1 ml-4 list-disc">
                  <li>100% accurate text extraction</li>
                  <li>Faster analysis</li>
                  <li>Better personalization</li>
                  <li>No formatting issues</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternative: File Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Or Upload File</CardTitle>
            <CardDescription>
              Upload your resume in PDF or DOCX format (max 5MB)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ResumeUploader
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              selectedFile={selectedFile}
              isUploading={isAnalyzing}
            />
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                ℹ️ File Upload
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Both PDF and DOCX files are supported. Text will be extracted automatically on the server for accurate analysis.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Job Description (Optional) */}
        <Card>
          <CardHeader>
            <CardTitle>Job Description (Optional)</CardTitle>
            <CardDescription>
              Paste the job description to get tailored feedback on how well your resume matches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
              disabled={isAnalyzing}
            />
          </CardContent>
        </Card>

        {/* Analyze Button */}
        <div className="flex justify-end">
          <Button
            size="lg"
            onClick={handleAnalyze}
            disabled={(!selectedFile && !resumeText.trim()) || isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"
          >
            {isAnalyzing ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Analyze with AI
              </>
            )}
          </Button>
        </div>

        {/* Info Card */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">📋 How to Copy Resume Text from PDF:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Open your resume PDF in any PDF reader</li>
                <li>Press <kbd className="px-2 py-1 bg-background border rounded">Ctrl+A</kbd> (or Cmd+A on Mac) to select all</li>
                <li>Press <kbd className="px-2 py-1 bg-background border rounded">Ctrl+C</kbd> (or Cmd+C) to copy</li>
                <li>Paste into the text area above</li>
              </ol>
              
              <div className="mt-4 pt-4 border-t">
                <p className="font-semibold text-foreground mb-2">💡 For Best ATS Analysis Results:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Include your full name at the top</li>
                  <li>Add contact information (email, phone, LinkedIn)</li>
                  <li>List work experience with company names and dates</li>
                  <li>Include a skills section with relevant technologies</li>
                  <li>Add education details</li>
                  <li>Use quantifiable achievements (e.g., "Improved performance by 40%")</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
