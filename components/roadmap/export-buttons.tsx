'use client';

import { Button } from '@/components/ui/button';
import { Download, Copy, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { pdf } from '@react-pdf/renderer';
import { RoadmapPDF } from '@/lib/generators/pdf-generator';
import { generateMarkdown, downloadMarkdown, copyMarkdownToClipboard } from '@/lib/generators/markdown-generator';
import type { Roadmap } from '@/types/database';

interface ExportButtonsProps {
  roadmap: Roadmap;
}

export function ExportButtons({ roadmap }: ExportButtonsProps) {
  const handleExportPDF = async () => {
    try {
      toast.info('Generating PDF...');

      const blob = await pdf(
        <RoadmapPDF
          roadmap={roadmap.content}
          metadata={{
            type: roadmap.type,
            intensity: roadmap.intensity,
            targetRole: roadmap.target_role,
          }}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${roadmap.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF');
    }
  };

  const handleExportMarkdown = () => {
    try {
      const markdown = generateMarkdown(roadmap.content, {
        type: roadmap.type,
        intensity: roadmap.intensity,
        targetRole: roadmap.target_role,
      });

      downloadMarkdown(
        markdown,
        roadmap.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()
      );

      toast.success('Markdown downloaded successfully!');
    } catch (error) {
      console.error('Markdown generation error:', error);
      toast.error('Failed to generate Markdown');
    }
  };

  const handleCopyMarkdown = async () => {
    try {
      const markdown = generateMarkdown(roadmap.content, {
        type: roadmap.type,
        intensity: roadmap.intensity,
        targetRole: roadmap.target_role,
      });

      await copyMarkdownToClipboard(markdown);

      toast.success('Copied to clipboard!');
    } catch (error) {
      console.error('Copy error:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={handleExportPDF}>
        <Download className="h-4 w-4 mr-2" />
        Export PDF
      </Button>
      <Button variant="outline" onClick={handleExportMarkdown}>
        <FileText className="h-4 w-4 mr-2" />
        Export Markdown
      </Button>
      <Button variant="outline" onClick={handleCopyMarkdown}>
        <Copy className="h-4 w-4 mr-2" />
        Copy to Clipboard
      </Button>
    </div>
  );
}
