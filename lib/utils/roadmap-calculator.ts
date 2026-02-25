/**
 * Calculate roadmap duration based on intensity
 */
export function calculateDuration(intensity: 'chill' | 'regular' | 'intense'): {
    months: number;
    weeks: number;
    hoursPerDay: number;
} {
    const durationMap = {
        chill: { months: 6, hoursPerDay: 2 },
        regular: { months: 3, hoursPerDay: 4 },
        intense: { months: 1.5, hoursPerDay: 6 },
    };

    const config = durationMap[intensity];
    const weeks = Math.ceil(config.months * 4);

    return {
        months: config.months,
        weeks,
        hoursPerDay: config.hoursPerDay,
    };
}

/**
 * Calculate total estimated hours
 */
export function calculateTotalHours(weeks: number, hoursPerDay: number): number {
    return weeks * 7 * hoursPerDay;
}
