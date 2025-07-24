export function createUrlWithQuery(url: string, query: Record<string, string>) {
    const result = new URL(url);
    Object.entries(query).forEach(([key, value]) => {
        result.searchParams.set(key, value);
    });

    return result.toString();
}
