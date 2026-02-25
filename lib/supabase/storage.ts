import { createServiceClient } from './server';

const RESUME_BUCKET = process.env.RESUME_BUCKET_NAME || 'resumes';

/**
 * Upload a resume file to Supabase Storage
 */
export async function uploadResume(
    file: File,
    userId: string
): Promise<{ path: string; url: string }> {
    const supabase = createServiceClient();

    // Generate unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${timestamp}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from(RESUME_BUCKET)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        throw new Error(`Failed to upload resume: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
        .from(RESUME_BUCKET)
        .getPublicUrl(data.path);

    return {
        path: data.path,
        url: urlData.publicUrl,
    };
}

/**
 * Get public URL for a resume
 */
export function getResumeUrl(path: string): string {
    const supabase = createServiceClient();

    const { data } = supabase.storage
        .from(RESUME_BUCKET)
        .getPublicUrl(path);

    return data.publicUrl;
}

/**
 * Delete a resume from storage
 */
export async function deleteResume(path: string): Promise<void> {
    const supabase = createServiceClient();

    const { error } = await supabase.storage
        .from(RESUME_BUCKET)
        .remove([path]);

    if (error) {
        throw new Error(`Failed to delete resume: ${error.message}`);
    }
}
