import { GET } from "./api"

import type { IWeather } from "@/types/weather"

const BASE_URL = "https://api.open-meteo.com/v1"

export interface WeatherPayload {
    latitude: number
    longitude: number
    hourly: string
    forecast_days?: number
}

/**
 * Retrieves weather forecast data for a specified location.
 *
 * @param payload - An object containing the latitude, longitude, and hourly parameters,
 *                  with an optional forecast_days parameter to specify the number of forecast days.
 * @returns A promise that resolves to weather data.
 */
export function getWeather(payload: WeatherPayload) {
    return GET<IWeather>(`${BASE_URL}/forecast`, payload)
}