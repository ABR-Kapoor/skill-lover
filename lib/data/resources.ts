/**
 * Pre-curated learning resources for the resource library
 */

export interface Resource {
    id: string;
    title: string;
    description: string;
    type: 'course' | 'video' | 'article' | 'tool' | 'book' | 'template' | 'platform';
    category: 'programming' | 'design' | 'business' | 'marketing' | 'career' | 'ai_ml' | 'data_science';
    platform: string;
    url: string;
    isFree: boolean;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedDuration?: string;
    rating?: number;
    tags: string[];
    featured?: boolean;
}

export const CURATED_RESOURCES: Resource[] = [
    // Programming - Beginner
    {
        id: 'res-001',
        title: 'freeCodeCamp - Responsive Web Design',
        description: 'Learn HTML, CSS, and responsive design principles by building 5 projects. Completely free and self-paced.',
        type: 'course',
        category: 'programming',
        platform: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
        isFree: true,
        difficulty: 'beginner',
        estimatedDuration: '300 hours',
        rating: 4.8,
        tags: ['HTML', 'CSS', 'Web Development', 'Responsive Design'],
        featured: true,
    },
    {
        id: 'res-002',
        title: 'JavaScript.info - The Modern JavaScript Tutorial',
        description: 'Comprehensive JavaScript tutorial covering basics to advanced topics. Free and regularly updated.',
        type: 'article',
        category: 'programming',
        platform: 'JavaScript.info',
        url: 'https://javascript.info/',
        isFree: true,
        difficulty: 'beginner',
        rating: 4.9,
        tags: ['JavaScript', 'Programming', 'Web Development'],
        featured: true,
    },
    {
        id: 'res-003',
        title: 'CS50 - Introduction to Computer Science',
        description: 'Harvard\'s introduction to computer science and programming. Free online course with certificates.',
        type: 'course',
        category: 'programming',
        platform: 'edX',
        url: 'https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science',
        isFree: true,
        difficulty: 'beginner',
        estimatedDuration: '12 weeks',
        rating: 4.9,
        tags: ['Computer Science', 'Programming', 'Python', 'C'],
        featured: true,
    },

    // Programming - Intermediate
    {
        id: 'res-004',
        title: 'Full Stack Open',
        description: 'Deep dive into modern web development with React, Node.js, and GraphQL. University of Helsinki course.',
        type: 'course',
        category: 'programming',
        platform: 'University of Helsinki',
        url: 'https://fullstackopen.com/',
        isFree: true,
        difficulty: 'intermediate',
        estimatedDuration: '200 hours',
        rating: 4.9,
        tags: ['React', 'Node.js', 'Full Stack', 'GraphQL'],
        featured: true,
    },
    {
        id: 'res-005',
        title: 'The Odin Project',
        description: 'Free full-stack curriculum with projects. Learn by building real applications.',
        type: 'course',
        category: 'programming',
        platform: 'The Odin Project',
        url: 'https://www.theodinproject.com/',
        isFree: true,
        difficulty: 'intermediate',
        estimatedDuration: '1000+ hours',
        rating: 4.8,
        tags: ['Full Stack', 'JavaScript', 'Ruby', 'Web Development'],
    },

    // Design
    {
        id: 'res-006',
        title: 'Refactoring UI',
        description: 'Learn UI design from scratch. Practical tips and techniques for developers.',
        type: 'book',
        category: 'design',
        platform: 'RefactoringUI',
        url: 'https://www.refactoringui.com/',
        isFree: false,
        difficulty: 'intermediate',
        rating: 4.9,
        tags: ['UI Design', 'Design Systems', 'Visual Design'],
        featured: true,
    },
    {
        id: 'res-007',
        title: 'Figma Tutorial for Beginners',
        description: 'Complete Figma tutorial covering all basics. Learn to design interfaces from scratch.',
        type: 'video',
        category: 'design',
        platform: 'YouTube',
        url: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8',
        isFree: true,
        difficulty: 'beginner',
        estimatedDuration: '1 hour',
        rating: 4.7,
        tags: ['Figma', 'UI Design', 'Design Tools'],
    },

    // AI & ML
    {
        id: 'res-008',
        title: 'Fast.ai - Practical Deep Learning',
        description: 'Top-down approach to deep learning. Build real models from day one.',
        type: 'course',
        category: 'ai_ml',
        platform: 'Fast.ai',
        url: 'https://course.fast.ai/',
        isFree: true,
        difficulty: 'intermediate',
        estimatedDuration: '7 weeks',
        rating: 4.9,
        tags: ['Deep Learning', 'AI', 'Machine Learning', 'Python'],
        featured: true,
    },
    {
        id: 'res-009',
        title: 'Google AI - Machine Learning Crash Course',
        description: 'Google\'s fast-paced introduction to machine learning with TensorFlow.',
        type: 'course',
        category: 'ai_ml',
        platform: 'Google',
        url: 'https://developers.google.com/machine-learning/crash-course',
        isFree: true,
        difficulty: 'beginner',
        estimatedDuration: '15 hours',
        rating: 4.7,
        tags: ['Machine Learning', 'TensorFlow', 'AI'],
    },

    // Data Science
    {
        id: 'res-010',
        title: 'Kaggle Learn',
        description: 'Free micro-courses on Python, ML, data visualization, and more. Hands-on practice.',
        type: 'course',
        category: 'data_science',
        platform: 'Kaggle',
        url: 'https://www.kaggle.com/learn',
        isFree: true,
        difficulty: 'beginner',
        rating: 4.8,
        tags: ['Data Science', 'Python', 'Machine Learning', 'Pandas'],
        featured: true,
    },

    // Career Development
    {
        id: 'res-011',
        title: 'Cracking the Coding Interview',
        description: 'Essential book for technical interview preparation. 189 programming questions and solutions.',
        type: 'book',
        category: 'career',
        platform: 'Amazon',
        url: 'https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850',
        isFree: false,
        difficulty: 'intermediate',
        rating: 4.7,
        tags: ['Interview Prep', 'Algorithms', 'Data Structures'],
        featured: true,
    },
    {
        id: 'res-012',
        title: 'LeetCode',
        description: 'Practice coding problems for technical interviews. Free tier available.',
        type: 'platform',
        category: 'career',
        platform: 'LeetCode',
        url: 'https://leetcode.com/',
        isFree: true,
        difficulty: 'intermediate',
        rating: 4.6,
        tags: ['Coding Practice', 'Interview Prep', 'Algorithms'],
    },

    // Business & Marketing
    {
        id: 'res-013',
        title: 'Y Combinator Startup School',
        description: 'Free online course on how to start a startup. Taught by YC partners.',
        type: 'course',
        category: 'business',
        platform: 'Y Combinator',
        url: 'https://www.startupschool.org/',
        isFree: true,
        difficulty: 'beginner',
        estimatedDuration: '8 weeks',
        rating: 4.8,
        tags: ['Startups', 'Entrepreneurship', 'Business'],
        featured: true,
    },
    {
        id: 'res-014',
        title: 'HubSpot Academy - Inbound Marketing',
        description: 'Free certification course on inbound marketing strategies.',
        type: 'course',
        category: 'marketing',
        platform: 'HubSpot',
        url: 'https://academy.hubspot.com/courses/inbound-marketing',
        isFree: true,
        difficulty: 'beginner',
        estimatedDuration: '4 hours',
        rating: 4.6,
        tags: ['Marketing', 'Digital Marketing', 'Content Marketing'],
    },

    // Tools
    {
        id: 'res-015',
        title: 'GitHub',
        description: 'Version control and collaboration platform. Essential for developers.',
        type: 'tool',
        category: 'programming',
        platform: 'GitHub',
        url: 'https://github.com/',
        isFree: true,
        difficulty: 'beginner',
        rating: 4.9,
        tags: ['Git', 'Version Control', 'Collaboration'],
        featured: true,
    },
    {
        id: 'res-016',
        title: 'VS Code',
        description: 'Free, powerful code editor with extensive extensions. Industry standard.',
        type: 'tool',
        category: 'programming',
        platform: 'Microsoft',
        url: 'https://code.visualstudio.com/',
        isFree: true,
        difficulty: 'beginner',
        rating: 4.9,
        tags: ['Code Editor', 'IDE', 'Development Tools'],
    },
    {
        id: 'res-017',
        title: 'Notion',
        description: 'All-in-one workspace for notes, tasks, wikis, and databases.',
        type: 'tool',
        category: 'career',
        platform: 'Notion',
        url: 'https://www.notion.so/',
        isFree: true,
        difficulty: 'beginner',
        rating: 4.7,
        tags: ['Productivity', 'Note-taking', 'Project Management'],
    },

    // Additional Programming Resources
    {
        id: 'res-018',
        title: 'MDN Web Docs',
        description: 'Comprehensive web development documentation. The go-to reference for web technologies.',
        type: 'article',
        category: 'programming',
        platform: 'Mozilla',
        url: 'https://developer.mozilla.org/',
        isFree: true,
        difficulty: 'beginner',
        rating: 4.9,
        tags: ['Web Development', 'Documentation', 'HTML', 'CSS', 'JavaScript'],
    },
    {
        id: 'res-019',
        title: 'React Official Tutorial',
        description: 'Official React documentation and tutorial. Learn React from the source.',
        type: 'article',
        category: 'programming',
        platform: 'React',
        url: 'https://react.dev/learn',
        isFree: true,
        difficulty: 'intermediate',
        rating: 4.8,
        tags: ['React', 'JavaScript', 'Frontend'],
    },
    {
        id: 'res-020',
        title: 'Tailwind CSS',
        description: 'Utility-first CSS framework. Official documentation and playground.',
        type: 'tool',
        category: 'programming',
        platform: 'Tailwind Labs',
        url: 'https://tailwindcss.com/',
        isFree: true,
        difficulty: 'beginner',
        rating: 4.8,
        tags: ['CSS', 'Styling', 'Frontend', 'UI'],
    },

    // Career & Interview
    {
        id: 'res-021',
        title: 'Pramp - Free Mock Interviews',
        description: 'Practice technical interviews with peers. Free and effective.',
        type: 'platform',
        category: 'career',
        platform: 'Pramp',
        url: 'https://www.pramp.com/',
        isFree: true,
        difficulty: 'intermediate',
        rating: 4.5,
        tags: ['Interview Prep', 'Mock Interviews', 'Practice'],
    },
    {
        id: 'res-022',
        title: 'LinkedIn Learning Path',
        description: 'Optimize your LinkedIn profile and build your professional network.',
        type: 'article',
        category: 'career',
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/learning/',
        isFree: false,
        difficulty: 'beginner',
        rating: 4.4,
        tags: ['LinkedIn', 'Networking', 'Personal Branding'],
    },

    // Design Resources
    {
        id: 'res-023',
        title: 'Dribbble',
        description: 'Design inspiration and portfolio platform. See what top designers are creating.',
        type: 'platform',
        category: 'design',
        platform: 'Dribbble',
        url: 'https://dribbble.com/',
        isFree: true,
        difficulty: 'beginner',
        rating: 4.6,
        tags: ['Design Inspiration', 'UI Design', 'Portfolio'],
    },
    {
        id: 'res-024',
        title: 'Behance',
        description: 'Showcase and discover creative work. Adobe\'s design portfolio platform.',
        type: 'platform',
        category: 'design',
        platform: 'Adobe',
        url: 'https://www.behance.net/',
        isFree: true,
        difficulty: 'beginner',
        rating: 4.5,
        tags: ['Design Portfolio', 'Creative Work', 'Inspiration'],
    },

    // Business & Freelancing
    {
        id: 'res-025',
        title: 'Indie Hackers',
        description: 'Community of founders sharing revenue numbers and growth strategies.',
        type: 'platform',
        category: 'business',
        platform: 'Indie Hackers',
        url: 'https://www.indiehackers.com/',
        isFree: true,
        difficulty: 'beginner',
        rating: 4.7,
        tags: ['Entrepreneurship', 'Startups', 'Community'],
    },
    {
        id: 'res-026',
        title: 'Upwork',
        description: 'Freelancing platform to find clients and build your freelance career.',
        type: 'platform',
        category: 'business',
        platform: 'Upwork',
        url: 'https://www.upwork.com/',
        isFree: true,
        difficulty: 'beginner',
        rating: 4.3,
        tags: ['Freelancing', 'Remote Work', 'Clients'],
    },

    // Data Science & Analytics
    {
        id: 'res-027',
        title: 'DataCamp',
        description: 'Interactive data science courses. Learn Python, R, SQL, and more.',
        type: 'course',
        category: 'data_science',
        platform: 'DataCamp',
        url: 'https://www.datacamp.com/',
        isFree: false,
        difficulty: 'beginner',
        rating: 4.5,
        tags: ['Data Science', 'Python', 'R', 'SQL'],
    },
    {
        id: 'res-028',
        title: 'Google Data Analytics Certificate',
        description: 'Professional certificate in data analytics. Beginner-friendly.',
        type: 'course',
        category: 'data_science',
        platform: 'Coursera',
        url: 'https://www.coursera.org/professional-certificates/google-data-analytics',
        isFree: false,
        difficulty: 'beginner',
        estimatedDuration: '6 months',
        rating: 4.8,
        tags: ['Data Analytics', 'Google', 'Certificate'],
    },

    // Marketing
    {
        id: 'res-029',
        title: 'Google Digital Garage',
        description: 'Free courses on digital marketing, data, and career development.',
        type: 'course',
        category: 'marketing',
        platform: 'Google',
        url: 'https://learndigital.withgoogle.com/',
        isFree: true,
        difficulty: 'beginner',
        rating: 4.5,
        tags: ['Digital Marketing', 'SEO', 'Analytics'],
    },
    {
        id: 'res-030',
        title: 'Content Marketing Institute',
        description: 'Resources and training for content marketing professionals.',
        type: 'article',
        category: 'marketing',
        platform: 'CMI',
        url: 'https://contentmarketinginstitute.com/',
        isFree: true,
        difficulty: 'intermediate',
        rating: 4.4,
        tags: ['Content Marketing', 'Strategy', 'Blogging'],
    },
];

/**
 * Get resources by category
 */
export function getResourcesByCategory(category: Resource['category']): Resource[] {
    return CURATED_RESOURCES.filter(r => r.category === category);
}

/**
 * Get featured resources
 */
export function getFeaturedResources(): Resource[] {
    return CURATED_RESOURCES.filter(r => r.featured);
}

/**
 * Search resources
 */
export function searchResources(query: string): Resource[] {
    const lowerQuery = query.toLowerCase();
    return CURATED_RESOURCES.filter(r =>
        r.title.toLowerCase().includes(lowerQuery) ||
        r.description.toLowerCase().includes(lowerQuery) ||
        r.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
}

/**
 * Filter resources
 */
export function filterResources(filters: {
    category?: Resource['category'];
    type?: Resource['type'];
    difficulty?: Resource['difficulty'];
    isFree?: boolean;
}): Resource[] {
    return CURATED_RESOURCES.filter(r => {
        if (filters.category && r.category !== filters.category) return false;
        if (filters.type && r.type !== filters.type) return false;
        if (filters.difficulty && r.difficulty !== filters.difficulty) return false;
        if (filters.isFree !== undefined && r.isFree !== filters.isFree) return false;
        return true;
    });
}
