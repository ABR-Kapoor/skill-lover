import { PageHeader } from '@/components/shared/page-header';
import { GeneratorForm } from '@/components/roadmap/generator-form';

export default function NewRoadmapPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Generate Career Roadmap"
        description="Create a personalized, AI-generated roadmap tailored to your goals"
      />
      
      <GeneratorForm />
    </div>
  );
}
