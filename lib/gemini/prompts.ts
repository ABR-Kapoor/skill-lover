import type { ATSAnalysisResult } from '@/types/database';

/**
 * ATS Analysis Prompt - Highly personalized with examples
 */
export function getATSAnalysisPrompt(resumeText: string, jobDescription?: string): string {
  return `You are an expert ATS (Applicant Tracking System) analyzer and career coach. Analyze the following resume and provide HIGHLY PERSONALIZED, SPECIFIC feedback.

RESUME CONTENT:
${resumeText}

${jobDescription ? `JOB DESCRIPTION TO MATCH AGAINST:\n${jobDescription}\n` : ''}

CRITICAL INSTRUCTIONS:
1. EXTRACT THE CANDIDATE'S NAME - It's usually in the first 1-3 lines of the resume
2. IDENTIFY their current/target role from the resume
3. ESTIMATE experience level from their work history
4. USE THEIR NAME throughout the feedback
5. REFERENCE their SPECIFIC skills, companies, and achievements
6. Make feedback ACTIONABLE and PERSONALIZED to their situation

SCORING GUIDELINES:
- 80-100: Excellent resume, strong ATS optimization
- 60-79: Good resume, minor improvements needed  
- 40-59: Average, needs significant work
- 20-39: Poor, major issues
- 1-19: Very poor, needs complete rewrite
- NEVER give 0

EXAMPLE OF GOOD PERSONALIZED FEEDBACK:
❌ BAD (Generic): "Add more keywords to your resume"
✅ GOOD (Personalized): "John, as a Senior Software Engineer with 8 years of experience, you should add keywords like 'microservices', 'AWS', and 'team leadership' which are common in senior roles at companies like Google and Microsoft"

❌ BAD: "Work experience section needs improvement"
✅ GOOD: "Sarah's experience at Amazon and Meta is impressive, but she should quantify her impact - for example, 'Led team of 5 engineers' instead of just 'Led team'"

Return ONLY this JSON structure (no markdown, no code blocks):

{
  "candidateName": "<MUST extract actual name from resume - look at first few lines>",
  "candidateTitle": "<Their current role or target position>",
  "yearsOfExperience": "<e.g., '5+ years', 'Entry Level', '10+ years'>",
  "atsScore": <1-100, realistic score>,
  "overallAssessment": "<Use their NAME. Mention their SPECIFIC background. Example: 'John's resume demonstrates strong experience in software development at Amazon and Google. With 8 years of experience, his resume scores well but could benefit from more quantified achievements in his leadership roles.'>",
  "strengths": [
    "<Mention SPECIFIC companies/skills. Example: 'Strong technical background with Python, React, and AWS mentioned throughout'>",
    "<Reference ACTUAL achievements. Example: 'Clear progression from Junior to Senior Developer at Microsoft'>",
    "<Use their NAME. Example: 'John effectively highlights his leadership experience'>"
  ],
  "weaknesses": [
    "<Be SPECIFIC to their resume. Example: 'Missing quantifiable metrics in the Amazon role (2019-2021)'>",
    "<Reference their ACTUAL content. Example: 'No mention of team size or project impact at Google'>",
    "<Personalized to their level. Example: 'For a senior role, John should emphasize strategic contributions'>"
  ],
  "missingKeywords": [
    "<Industry-specific for THEIR field. Example: 'Kubernetes' for DevOps, 'Agile' for PM>",
    "<Role-specific. Example: 'Team Leadership' for senior roles>",
    "<Company-specific if job description provided>"
  ],
  "suggestions": [
    {
      "category": "Work Experience",
      "issue": "<SPECIFIC issue in THEIR resume>",
      "suggestion": "<Use their NAME and SPECIFIC details. Example: 'John should add metrics to his Amazon role, such as: Improved system performance by 40%, reducing latency from 200ms to 120ms'>",
      "impact": "high"
    }
  ],
  "sectionScores": [
    {"section": "Contact Information", "score": <0-100>, "feedback": "<Personalized. Example: 'John includes email and LinkedIn, but should add phone number and GitHub profile'>"},
    {"section": "Professional Summary", "score": <0-100>, "feedback": "<Specific. Example: 'Strong summary highlighting 8 years of experience, but could mention specific technologies like React and Node.js'>"},
    {"section": "Work Experience", "score": <0-100>, "feedback": "<Reference ACTUAL companies. Example: 'Experience at Amazon and Google is impressive, but lacks quantified achievements'>"},
    {"section": "Skills", "score": <0-100>, "feedback": "<List ACTUAL skills. Example: 'Good coverage of Python, JavaScript, AWS, but missing Docker and Kubernetes'>"},
    {"section": "Education", "score": <0-100>, "feedback": "<Specific. Example: 'BS in Computer Science from MIT is well-presented'>"},
    {"section": "Formatting & ATS Compatibility", "score": <0-100>, "feedback": "<Specific issues. Example: 'Clean format, but use standard section headers like EXPERIENCE instead of MY JOURNEY'>"}
  ],
  "keywordAnalysis": {
    "presentKeywords": ["<List ACTUAL keywords from resume>"],
    "missingImportantKeywords": ["<Keywords for THEIR specific role/industry>"],
    "keywordDensity": "appropriate|too low|too high"
  },
  "recommendedImprovements": [
    "<Use NAME and be SPECIFIC. Example: 'John should add quantified achievements to his Amazon role: Led team of 5 engineers, Reduced deployment time by 60%'>",
    "<Reference their ACTUAL background. Example: 'With 8 years of experience, John should add a leadership/mentorship section'>",
    "<Industry-specific for THEM. Example: 'For senior software roles, add system design experience and architecture decisions'>"
  ]
}

REMEMBER:
- ALWAYS extract and use the candidate's actual name
- Reference their SPECIFIC companies, roles, and skills
- Make suggestions ACTIONABLE with concrete examples
- Tailor feedback to their experience level
- Be encouraging but honest
- Use their name in overallAssessment and improvements

Analyze the resume now and provide HIGHLY PERSONALIZED feedback.`;
}


/**
 * Roadmap Generation Prompt - Optimized for faster generation
 */
export function getRoadmapGenerationPrompt(params: {
  type: 'entrepreneur' | 'job_seeker';
  targetRole: string;
  intensity: 'chill' | 'regular' | 'intense';
  currentSkills?: string[];
}): string {
  const durationMap = {
    chill: { months: 6, hoursPerDay: 2 },
    regular: { months: 3, hoursPerDay: 4 },
    intense: { months: 1.5, hoursPerDay: 6 }
  };

  const duration = durationMap[params.intensity];
  const weeks = Math.min(Math.ceil(duration.months * 4), 6); // Limit to 6 weeks for faster generation

  const pathFocus = params.type === 'entrepreneur'
    ? 'building a profitable business with client acquisition, sales, marketing, and scaling'
    : 'landing a job with resume optimization, interview prep, networking, and applications';

  return `Create a ${weeks}-week roadmap for ${params.type === 'entrepreneur' ? 'an entrepreneur' : 'a job seeker'} targeting: ${params.targetRole}

Skills: ${params.currentSkills?.join(', ') || 'Beginner'}
Intensity: ${params.intensity} (${duration.hoursPerDay}h/day)
Focus: ${pathFocus}

Return ONLY valid JSON (no markdown):
{
  "title": "Short title",
  "description": "2 sentence overview",
  "durationMonths": ${duration.months},
  "totalWeeks": ${weeks},
  "hoursPerDay": ${duration.hoursPerDay},
  "estimatedTotalHours": ${weeks * 7 * duration.hoursPerDay},
  "milestones": [
    {
      "week": 1,
      "phase": "Foundation",
      "title": "Week title",
      "description": "Focus area",
      "learningObjectives": ["obj1", "obj2"],
      "tasks": [
        {
          "title": "Task name",
          "description": "What to do",
          "type": "learning|project|networking",
          "estimatedHours": 5,
          "priority": "high",
          "resources": [{"title": "Resource", "type": "video", "platform": "YouTube", "url": "https://youtube.com/watch?v=example", "isFree": true, "estimatedDuration": "1h"}],
          "deliverable": "Output",
          "successCriteria": "Measure"
        }
      ],
      "weeklyGoal": "Main goal",
      "timeAllocation": {"learning": 10, "practice": 8, "projects": 10, "networking": 5}
    }
  ],
  "keySkills": ["skill1", "skill2", "skill3"],
  "toolsAndPlatforms": ["tool1", "tool2"],
  "successMetrics": ["metric1", "metric2"],
  "tips": ["tip1", "tip2"]
}

Generate ${weeks} weeks, 2-3 tasks each. Use real YouTube URLs from channels like freeCodeCamp, Traversy Media, CodeWithHarry.`;
}
