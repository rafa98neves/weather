import { GET } from "./api"

import type { ILocation } from "@/types/localizations"

const BASE_URL = "https://geocoding-api.open-meteo.com/v1"

/**
 * Search for locations by name
 * 
 * @param search the name of the location to search for
 * @returns a promise resolving to an object containing the search results
 * @example
 * searchLocation('London')
 *   .then(r => r.results)
 */
export function searchLocation(search: string) {
    return GET<{ results: ILocation[] }>(`${BASE_URL}/search`, { name: search })
}