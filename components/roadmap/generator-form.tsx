'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NeuCard } from '@/components/ui/neu-card';
import { AuraButton } from '@/components/ui/aura-button';
import { Progress } from '@/components/ui/progress';
import { PathSelector } from './path-selector';
import { IntensitySelector } from './intensity-selector';
import { RoleInput } from './role-input';
import { SkillsInput } from './skills-input';
import { BusinessDomainInput } from './business-domain-input';
import { BusinessTypeSelector } from './business-type-selector';
import { ResourcesInput } from './resources-input';
import { FocusAreaSelector } from './focus-area-selector';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const getSteps = (type: 'entrepreneur' | 'job_seeker' | null) => {
  if (type === 'entrepreneur') {
    return [
      { id: 1, title: 'Choose Your Path', description: 'Entrepreneur or Job Seeker?' },
      { id: 2, title: 'Business Domain', description: 'What industry/domain?' },
      { id: 3, title: 'Business Type', description: 'Product or Service?' },
      { id: 4, title: 'Current Resources', description: 'What do you have?' },
      { id: 5, title: 'Focus Area', description: 'Marketing, Tech, or Sales?' },
      { id: 6, title: 'Select Intensity', description: 'How much time can you commit?' },
      { id: 7, title: 'Current Skills', description: 'What do you already know?' },
    ];
  }
  return [
    { id: 1, title: 'Choose Your Path', description: 'Entrepreneur or Job Seeker?' },
    { id: 2, title: 'Select Intensity', description: 'How much time can you commit?' },
    { id: 3, title: 'Target Role', description: 'What role are you aiming for?' },
    { id: 4, title: 'Current Skills', description: 'What do you already know?' },
  ];
};

export function GeneratorForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState<{
    type: 'entrepreneur' | 'job_seeker' | null;
    intensity: 'chill' | 'regular' | 'intense' | null;
    targetRole: string;
    currentSkills: string[];
    // Entrepreneur-specific fields
    businessDomain?: string;
    businessType?: 'product' | 'service' | 'both' | null;
    currentResources?: string[];
    focusArea?: 'marketing' | 'tech' | 'sales' | 'operations' | null;
  }>({
    type: null,
    intensity: null,
    targetRole: '',
    currentSkills: [],
    businessDomain: '',
    businessType: null,
    currentResources: [],
    focusArea: null,
  });

  const STEPS = getSteps(formData.type);

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.type !== null;
      case 2:
        if (formData.type === 'entrepreneur') {
          return formData.businessDomain && formData.businessDomain.trim().length >= 3;
        }
        return formData.intensity !== null;
      case 3:
        if (formData.type === 'entrepreneur') {
          return formData.businessType !== null;
        }
        return formData.targetRole.trim().length >= 3;
      case 4:
        if (formData.type === 'entrepreneur') {
          return true; // Resources are optional
        }
        return true; // Skills are optional
      case 5:
        if (formData.type === 'entrepreneur') {
          return formData.focusArea !== null;
        }
        return true;
      case 6:
        if (formData.type === 'entrepreneur') {
          return formData.intensity !== null;
        }
        return true;
      case 7:
        return true; // Skills are optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed()) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleGenerate = async () => {
    // Validate based on path type
    if (!formData.type || !formData.intensity) {
      toast.error('Please complete all required fields');
      return;
    }

    if (formData.type === 'entrepreneur') {
      if (!formData.businessDomain || !formData.businessType || !formData.focusArea) {
        toast.error('Please complete all business fields');
        return;
      }
    } else {
      if (!formData.targetRole) {
        toast.error('Please enter your target role');
        return;
      }
    }

    setIsGenerating(true);

    try {
      toast.info('Generating your personalized roadmap... This may take a moment');

      // Prepare target role for entrepreneurs
      const targetRole = formData.type === 'entrepreneur'
        ? `${formData.businessDomain} - ${formData.businessType} Business (Focus: ${formData.focusArea})`
        : formData.targetRole;

      const res = await fetch('/api/roadmap/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formData.type,
          intensity: formData.intensity,
          targetRole: targetRole,
          currentSkills: formData.currentSkills.length > 0 ? formData.currentSkills : undefined,
        }),
      });

      console.log('Response status:', res.status);
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));

      let data;
      try {
        const text = await res.text();
        console.log('Response text:', text);
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        toast.error('Invalid response from server');
        return;
      }

      if (!res.ok) {
        console.error('API Error:', data);
        
        if (res.status === 402) {
          toast.error('Insufficient credits. Please purchase more credits.');
          router.push('/dashboard');
          return;
        }
        
        if (res.status === 401) {
          toast.error('Please sign in to generate roadmaps');
          router.push('/sign-in');
          return;
        }
        
        // Show the actual error message from the API
        const errorMessage = data.error || data.message || 'Generation failed';
        toast.error(`Error: ${errorMessage}`);
        console.error('Full error details:', data);
        return;
      }

      toast.success('Roadmap generated successfully!');
      router.push(`/roadmaps/${data.data.id}`);
    } catch (error: any) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate roadmap. Check console for details.');
    } finally {
      setIsGenerating(false);
    }
  };

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress */}
      <div className="space-y-4 px-1">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold font-display text-primary">
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="text-muted-foreground text-xs font-mono">{Math.round(progress)}% COMPLETE</span>
        </div>
        <div className="h-1.5 w-full bg-surface-deep/50 rounded-full overflow-hidden">
             <div 
               className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-500 ease-out"
               style={{ width: `${progress}%` }}
             />
        </div>
      </div>

      {/* Step Content */}
      <NeuCard className="p-8 border-primary/20 bg-surface-base dark:bg-[#161B28]">
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-display tracking-tight text-foreground mb-2">{STEPS[currentStep - 1].title}</h2>
          <p className="text-lg text-muted-foreground font-light">
            {STEPS[currentStep - 1].description}
          </p>
        </div>
        
        <div className="space-y-8 min-h-[300px]">
          {currentStep === 1 && (
            <PathSelector
              value={formData.type}
              onChange={(value) => {
                setFormData({ ...formData, type: value });
                // Reset to step 1 when changing path type
                setCurrentStep(1);
              }}
            />
          )}

          {/* Entrepreneur Path */}
          {formData.type === 'entrepreneur' && (
            <>
              {currentStep === 2 && (
                <BusinessDomainInput
                  value={formData.businessDomain || ''}
                  onChange={(value) => setFormData({ ...formData, businessDomain: value })}
                />
              )}

              {currentStep === 3 && (
                <BusinessTypeSelector
                  value={formData.businessType || null}
                  onChange={(value) => setFormData({ ...formData, businessType: value })}
                />
              )}

              {currentStep === 4 && (
                <ResourcesInput
                  value={formData.currentResources || []}
                  onChange={(value) => setFormData({ ...formData, currentResources: value })}
                />
              )}

              {currentStep === 5 && (
                <FocusAreaSelector
                  value={formData.focusArea || null}
                  onChange={(value) => setFormData({ ...formData, focusArea: value })}
                />
              )}

              {currentStep === 6 && (
                <IntensitySelector
                  value={formData.intensity}
                  onChange={(value) => setFormData({ ...formData, intensity: value })}
                />
              )}

              {currentStep === 7 && (
                <SkillsInput
                  value={formData.currentSkills}
                  onChange={(value) => setFormData({ ...formData, currentSkills: value })}
                />
              )}
            </>
          )}

          {/* Job Seeker Path */}
          {formData.type === 'job_seeker' && (
            <>
              {currentStep === 2 && (
                <IntensitySelector
                  value={formData.intensity}
                  onChange={(value) => setFormData({ ...formData, intensity: value })}
                />
              )}

              {currentStep === 3 && (
                <RoleInput
                  value={formData.targetRole}
                  onChange={(value) => setFormData({ ...formData, targetRole: value })}
                />
              )}

              {currentStep === 4 && (
                <SkillsInput
                  value={formData.currentSkills}
                  onChange={(value) => setFormData({ ...formData, currentSkills: value })}
                />
              )}
            </>
          )}
        </div>
      </NeuCard>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <AuraButton
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 1 || isGenerating}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </AuraButton>

        {currentStep < STEPS.length ? (
          <AuraButton onClick={handleNext} disabled={!canProceed() || isGenerating} className="px-8">
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </AuraButton>
        ) : (
          <AuraButton
            onClick={handleGenerate}
            disabled={!canProceed() || isGenerating}
            className="px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 shadow-lg hover:shadow-xl hover:shadow-primary/20"
          >
            {isGenerating ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Roadmap
              </>
            )}
          </AuraButton>
        )}
      </div>
    </div>
  );
}
