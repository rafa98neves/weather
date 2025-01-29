/** Service wrapper for API requests */

/**
 * Sends a GET request to the specified URL with optional query parameters.
 */
export async function GET<T>(url: string, payload?: unknown) {
    if (payload) {
        const params = new URLSearchParams(payload as Record<string, string>)
        url += `?${params.toString()}`
    }

    const response = await fetch(url, { method: "GET" })
    return response.json() as T
}

/**
 * Sends a POST request to the specified URL with the given payload.
 */
export async function POST<T>(url: string, payload: unknown) {
    const response = await fetch(url, { method: "POST", body: JSON.stringify(payload) })
    return response.json() as T
}
