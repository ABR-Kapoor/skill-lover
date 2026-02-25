/**
 * Validate and fix YouTube URLs in roadmap content
 */
export function validateAndFixYouTubeUrls(content: any): any {
    if (!content || !content.milestones) return content;

    content.milestones.forEach((milestone: any) => {
        if (!milestone.tasks) return;

        milestone.tasks.forEach((task: any) => {
            if (!task.resources) return;

            task.resources.forEach((resource: any) => {
                // Check if it's a YouTube video
                if (resource.type === 'video' && resource.platform?.toLowerCase().includes('youtube')) {
                    const url = resource.url;

                    // Check if URL is valid YouTube format
                    const isValidYouTube =
                        url?.includes('youtube.com/watch?v=') ||
                        url?.includes('youtu.be/') ||
                        url?.includes('youtube.com/playlist?list=');

                    // If URL looks fake or invalid, convert to search term
                    if (!isValidYouTube ||
                        url?.includes('example') ||
                        url?.includes('placeholder') ||
                        url?.includes('VIDEO_ID') ||
                        url?.includes('PLAYLIST_ID')) {

                        // Create a search term based on the resource title
                        const searchTerm = resource.title || task.title || 'tutorial';
                        resource.url = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`;
                        resource.title = `🔍 Search: ${resource.title}`;
                        console.log(`⚠️ Fixed invalid YouTube URL for: ${resource.title}`);
                    }
                }
            });
        });
    });

    return content;
}

/**
 * Common real YouTube video IDs for popular topics
 * These are actual working videos that can be used as fallbacks
 */
export const REAL_YOUTUBE_VIDEOS: Record<string, string[]> = {
    'javascript': [
        'hdI2bqOjy3c', // Traversy Media - JS Crash Course
        'PkZNo7MFNFg', // freeCodeCamp - Learn JavaScript
        'W6NZfCO5SIk', // Mosh - JavaScript Tutorial
    ],
    'react': [
        'w7ejDZ8SWv8', // Traversy Media - React Crash Course
        'bMknfKXIFA8', // freeCodeCamp - React Course
        'Ke90Tje7VS0', // Mosh - React Tutorial
    ],
    'nodejs': [
        'fBNz5xF-Kx4', // Traversy Media - Node.js Crash Course
        'Oe421EPjeBE', // freeCodeCamp - Node.js and Express
        'TlB_eWDSMt4', // Mosh - Node.js Tutorial
    ],
    'python': [
        'rfscVS0vtbw', // freeCodeCamp - Python for Beginners
        '_uQrJ0TkZlc', // Mosh - Python Tutorial
        'kqtD5dpn9C8', // Traversy Media - Python Crash Course
    ],
    'git': [
        'RGOj5yH7evk', // freeCodeCamp - Git and GitHub
        'SWYqp7iY_Tc', // Traversy Media - Git Crash Course
        'HVsySz-h9r4', // Corey Schafer - Git Tutorial
    ],
    'html_css': [
        'UB1O30fR-EE', // Traversy Media - HTML Crash Course
        'yfoY53QXEnI', // freeCodeCamp - HTML CSS
        'mU6anWqZJcc', // Web Dev Simplified - Learn HTML
    ],
    'hindi_web_dev': [
        'hQAHSlTtcmY', // CodeWithHarry - Web Development
        'tVzUXW6siu0', // Apna College - Web Development
        '6mbwJ2xhgzM', // Thapa Technical - HTML CSS
    ],
};
