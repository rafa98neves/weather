<script setup lang="ts">
import { computed, type PropType } from "vue";

import type { IParsedWeatherUnits } from "@/types/weather";

const model = defineModel();

const props = defineProps({
  details: {
    type: Object as PropType<IParsedWeatherUnits>,
    required: true,
  },
});

const data = computed(() => {
  const { details } = props;

  return {
    temperature: details.temperature_2m,
    apparentTemperature: details.apparent_temperature,
    precipitationProbability: details.precipitation_probability,
    time: details.time,
  };
});
</script>

<template>
  <div class="c-WeatherCard">
    <p>{{ data.time }}</p>

    <div
      class="c-WeatherCard__card"
      :class="{ focus: model === true }"
      @click="model = true"
    >
      <div class="c-WeatherCard__icon">
        <img :src="`/${details.icon}.gif`" :alt="details.icon" />
      </div>

      <p v-tooltip="'Temperature'">{{ data.temperature }}</p>

      <p v-tooltip="'Probability of precipitation'">
        {{ data.precipitationProbability }}
      </p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.c-WeatherCard > p {
  font-size: 12px;
  text-align: center;
  margin-top: 0.2rem;
}

.c-WeatherCard__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px 0;
}

img {
  max-width: 35px;
}

.c-WeatherCard__card {
  cursor: pointer;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  padding: 12px 24px;
}

.c-WeatherCard__card > p {
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
  color: var(--color-text);
}

.c-WeatherCard__card.focus {
  background-color: var(--color-background);
  border: 1px solid var(--color-text);
}
</style>
