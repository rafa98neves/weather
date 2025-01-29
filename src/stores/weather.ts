import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { ICoordinates } from '@/types/localizations'
import { getWeather } from '@/services/weatherService'
import type { LoadingState } from '@/types/general'

export const useWeather = defineStore('weather', () => {

  const state = ref<LoadingState>('idle')

  async function fetchWeather(coordinates: ICoordinates) {
    state.value = 'loading';
    const data = await getWeather({ ...coordinates, hourly: 'temperature_2m,precipitation_probability,apparent_temperature' })
    state.value = 'idle';

    return data
  }

  return { state, fetchWeather }
})
