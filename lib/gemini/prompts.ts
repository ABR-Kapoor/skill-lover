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
 * Roadmap Generation Prompt
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
  const weeks = Math.min(Math.ceil(duration.months * 4), 12); // Limit to 12 weeks to prevent API timeouts

  const entrepreneurFocus = params.type === 'entrepreneur'
    ? `ENTREPRENEUR/BUSINESS PATH - Focus on building a profitable business:

BUSINESS FUNDAMENTALS:
- Market research and identifying profitable niches
- Creating a business plan and financial projections
- Understanding your target customer and their pain points
- Competitive analysis and unique value proposition
- Pricing strategies and revenue models (freelancing, products, services, SaaS)

CUSTOMER ACQUISITION:
- Building a strong personal brand on LinkedIn, Twitter/X, and Instagram
- Content marketing and thought leadership
- Cold outreach strategies (email, LinkedIn, DMs)
- Networking at industry events and online communities
- Creating a compelling portfolio/case studies
- Client testimonials and social proof

SALES & MARKETING:
- Writing winning proposals and pitches
- Negotiation skills and closing deals
- Email marketing and lead nurturing
- SEO and content strategy
- Social media marketing and engagement
- Building a sales funnel

BUSINESS OPERATIONS:
- Setting up legal structure (LLC, sole proprietorship, etc.)
- Financial management and bookkeeping
- Time management and productivity systems
- Building systems and processes for scalability
- Hiring and managing freelancers/team members
- Tools and automation (CRM, project management, invoicing)

GROWTH & SCALING:
- Transitioning from freelancer to agency/product
- Creating passive income streams
- Building recurring revenue (retainers, subscriptions)
- Strategic partnerships and collaborations
- Raising capital or bootstrapping strategies
- Exit strategies and long-term vision

MINDSET & SKILLS:
- Entrepreneurial mindset and resilience
- Risk management and decision making
- Public speaking and presentation skills
- Leadership and team building
- Continuous learning and adaptation`
    : `JOB SEEKER PATH - Focus on landing your dream job:

JOB SEARCH STRATEGY:
- Job search strategies and application tracking
- Resume and LinkedIn optimization for ATS
- Cover letter writing and personalization
- Identifying target companies and roles
- Understanding job market trends

INTERVIEW PREPARATION:
- Technical interview preparation
- Behavioral interview techniques (STAR method)
- Mock interviews and feedback
- Salary negotiation strategies
- Following up with recruiters

SKILL BUILDING:
- Building a portfolio of projects
- Contributing to open source
- Preparing for technical assessments
- Certifications and courses
- Networking for job opportunities

PROFESSIONAL BRANDING:
- LinkedIn profile optimization
- GitHub portfolio showcase
- Personal website/blog
- Professional networking
- Industry event participation`;

  return `You are an expert ${params.type === 'entrepreneur' ? 'business mentor and startup advisor' : 'career mentor and job coach'}. Create a highly detailed, personalized ${params.intensity} intensity roadmap for a ${params.type} aiming to ${params.type === 'entrepreneur' ? 'build a successful business as' : 'get hired as'}: ${params.targetRole}

USER CONTEXT:
- Career Path: ${params.type === 'entrepreneur' ? 'ENTREPRENEUR - Building a Business (Freelancing, Consulting, Agency, or Startup)' : 'JOB SEEKER - Getting Employed'}
- Target Role/Business: ${params.targetRole}
- Current Skills: ${params.currentSkills?.join(', ') || 'Beginner/No prior experience'}
- Intensity: ${params.intensity} (${duration.hoursPerDay} hours/day, ${duration.months} months)
- Total Weeks: ${weeks}

${entrepreneurFocus}

Generate a comprehensive roadmap with week-by-week milestones, tasks, and resources.
Respond with valid JSON only (no markdown, no code blocks).

JSON STRUCTURE:
{
  "title": "Concise roadmap title",
  "description": "2-3 sentence overview",
  "durationMonths": ${duration.months},
  "totalWeeks": ${weeks},
  "hoursPerDay": ${duration.hoursPerDay},
  "estimatedTotalHours": ${weeks * 7 * duration.hoursPerDay},
  "milestones": [
    {
      "week": 1,
      "phase": "Foundation|Growth|Mastery|Launch",
      "title": "Week title",
      "description": "What this week focuses on",
      "learningObjectives": ["objective 1", "objective 2", "objective 3"],
      "tasks": [
        {
          "title": "Task title",
          "description": "Detailed task description",
          "type": "${params.type === 'entrepreneur'
      ? 'learning|project|networking|client_outreach|content_creation|business_setup|sales|marketing|linkedin|instagram|offline'
      : 'learning|project|networking|linkedin|instagram|offline|interview_prep|application'}",
          "estimatedHours": 5,
          "priority": "high|medium|low",
          "resources": [
            {
              "title": "Resource name",
              "type": "course|video|article|tool|book|template",
              "platform": "Platform name",
              "url": "https://example.com",
              "isFree": true,
              "estimatedDuration": "2 hours"
            }
          ],
          "deliverable": "What should be completed",
          "successCriteria": "How to measure success"
        }
      ],
      "weeklyGoal": "Main goal for the week",
      "timeAllocation": {
        "learning": 10,
        "practice": 8,
        "projects": 12,
        "networking": 5
      }
    }
  ],
  "keySkills": ["skill1", "skill2", "skill3"],
  "toolsAndPlatforms": ["tool1", "tool2", "tool3"],
  "successMetrics": ["metric1", "metric2", "metric3"],
  "tips": ["tip1", "tip2", "tip3"]
}

REQUIREMENTS:
1. Create ${weeks} weekly milestones
2. Each week should have 3-5 tasks
3. Include REAL, WORKING YouTube video links - DO NOT make up fake URLs
4. For each task, provide at least 2-3 YouTube video tutorials
5. Include popular Hindi YouTube channels like: CodeWithHarry, Apna College, Thapa Technical, etc.
6. Balance learning, practice, projects, and networking
7. Make tasks specific and measurable
8. Include both free and paid resources (prefer free YouTube content)
9. Tailor to ${params.type} path
10. Consider current skill level: ${params.currentSkills?.length ? 'Intermediate' : 'Beginner'}
11. Ensure progressive difficulty
12. Include practical deliverables

CRITICAL: YOUTUBE URL REQUIREMENTS:
- ALL YouTube URLs MUST be in format: https://www.youtube.com/watch?v=VIDEO_ID
- Use REAL video IDs from actual existing videos
- DO NOT create fake or placeholder URLs
- Verify the channel name matches the actual YouTube channel
- For playlists, use: https://www.youtube.com/playlist?list=PLAYLIST_ID

EXAMPLE REAL YOUTUBE URLS (use similar format):
✅ CORRECT: "url": "https://www.youtube.com/watch?v=hdI2bqOjy3c" (Traversy Media - JavaScript Crash Course)
✅ CORRECT: "url": "https://www.youtube.com/watch?v=RGOj5yH7evk" (freeCodeCamp - Git and GitHub)
✅ CORRECT: "url": "https://www.youtube.com/watch?v=hQAHSlTtcmY" (CodeWithHarry - Web Development Hindi)
❌ WRONG: "url": "https://youtube.com/example" (fake URL)
❌ WRONG: "url": "https://www.youtube.com/placeholder" (placeholder)

RESOURCE GUIDELINES:
- MUST include YouTube videos for every learning task
- Use REAL, EXISTING YouTube video URLs only
- Provide both English and Hindi video options when available
- Include video duration estimates (e.g., "45 minutes", "2 hours")
- Prefer popular, high-quality channels with verified content
- Mix of tutorials, project walkthroughs, and concept explanations
- For documentation/articles, use official sources (MDN, official docs, etc.)

POPULAR YOUTUBE CHANNELS TO USE (with real content):
English: 
- Traversy Media (https://www.youtube.com/@TraversyMedia)
- freeCodeCamp (https://www.youtube.com/@freecodecamp)
- The Net Ninja (https://www.youtube.com/@NetNinja)
- Web Dev Simplified (https://www.youtube.com/@WebDevSimplified)
- Fireship (https://www.youtube.com/@Fireship)

Hindi:
- CodeWithHarry (https://www.youtube.com/@CodeWithHarry)
- Apna College (https://www.youtube.com/@ApnaCollegeOfficial)
- Thapa Technical (https://www.youtube.com/@ThapaTechnical)
- Chai aur Code (https://www.youtube.com/@chaiaurcode)
- WsCube Tech (https://www.youtube.com/@WsCubeTech)

IMPORTANT: Only include URLs from these verified channels or other well-known educational channels. If you're not sure about a URL, use a general search term instead (e.g., "Search: React tutorial for beginners").

Return ONLY the JSON object, no additional text.`;
}
