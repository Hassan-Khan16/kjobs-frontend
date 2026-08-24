export function sanitizeSheetName(name: string) {
    return name
        .replace(/[:\\/?*\[\]]/g, '-') // replace invalid chars
        .trim()
        .slice(0, 31); // Excel limit
}