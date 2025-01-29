import { ref } from 'vue';
import { defineStore } from 'pinia'

import { searchLocation } from '@/services/localizationService'
import type { LoadingState } from '@/types/general';

export const useLocalization = defineStore('localization', () => {

  const state = ref<LoadingState>('idle')

  async function search(query: string) {

    if (query.length < 3) return [];

    state.value = 'loading';
    const { results } = await searchLocation(query);
    state.value = 'idle';

    return results
  }

  return { state, search }
})
