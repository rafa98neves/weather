<script setup lang="ts">
import { ref, watch, type PropType } from "vue";

import { useWeather } from "@/stores/weather";

import type { IWeather } from "@/types/weather";
import type { ILocation } from "@/types/localizations";

import WeatherIndicator from "@/components/organisms/WeatherIndicator.vue";

const weatherStore = useWeather();

const weather = ref<IWeather | null>(null);

const props = defineProps({
  location: {
    type: Object as PropType<ILocation>,
    required: false,
  },
});

watch(
  () => props.location,
  async () => {
    if (!props.location) {
      weather.value = null;
      return;
    }
    const { latitude, longitude } = props.location;
    const data = await weatherStore.fetchWeather({ latitude, longitude });

    weather.value = data;
  },
  { immediate: true }
);
</script>

<template>
  <Transition name="fade" mode="out-in">
    <WeatherIndicator v-if="weather" :weather="weather" />
    <p v-else>Start by selecting where you want to see the weather!</p>
  </Transition>
</template>

<style lang="css" scoped>
p {
  color: var(--color-text);
  text-align: center;
  margin-top: 5rem;
}
</style>
