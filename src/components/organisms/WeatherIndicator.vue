<script setup lang="ts">
import { computed, ref, watch, type PropType } from "vue";
import Button from "primevue/button";

import { format } from "date-fns";

import type { IWeather, IParsedWeatherUnits } from "@/types/weather";
import WeatherCard from "@/components/molecules/WeatherCard.vue";
import { useWindowSize } from "@vueuse/core";

const props = defineProps({
  weather: {
    type: Object as PropType<IWeather>,
    required: true,
  },
});

const layout = useWindowSize();

const itemsPerPage = ref(8);
const pageStart = ref(0);
const selected = ref<number | null>(null);

const selectedDetails = computed(() => {
  if (selected.value === null) return null;
  return parseDetails(selected.value);
});

const currentDay = computed(() => {
  if (pageStart.value + itemsPerPage.value <= 24) {
    return "Today";
  }

  const date = new Date(props.weather.hourly.time[pageStart.value]);
  return format(date, "EEEE");
});

const page = computed(() => {
  return props.weather.hourly.time
    .slice(pageStart.value, pageStart.value + itemsPerPage.value)
    .map((_, index) => parseDetails(pageStart.value + index));
});

function parseDetails(index: number): IParsedWeatherUnits {
  const { hourly, hourly_units } = props.weather;

  let icon = "sunny";
  const probability = parseInt(hourly.precipitation_probability[index]);

  if (probability > 40 && probability <= 60) icon = "cloudy";
  if (probability > 60) icon = "rainny";

  return {
    id: index,
    icon,
    temperature_2m: `${hourly.temperature_2m[index]} ${hourly_units.temperature_2m}`,
    apparent_temperature: `${hourly.apparent_temperature[index]} ${hourly_units.apparent_temperature}`,
    precipitation_probability: `${hourly.precipitation_probability[index]} ${hourly_units.precipitation_probability}`,
    time: format(hourly.time[index], "h aaaaa'm'"),
  };
}

function previousPage(hours = itemsPerPage.value) {
  pageStart.value = Math.max(pageStart.value - hours, 0);
}

function nextPage(hours = itemsPerPage.value) {
  const maxPage = props.weather.hourly.time.length - hours;
  pageStart.value = Math.min(pageStart.value + hours, maxPage);
}

function canGoForward(hours = 0) {
  return pageStart.value + hours <= props.weather.hourly.time.length;
}

function canGoBackward(hours = 0) {
  return pageStart.value - hours >= 0;
}

function onSelected(index: number) {
  selected.value = index;
}

watch(
  () => layout.width.value,
  () => {
    const { value } = layout.width;
    itemsPerPage.value = value < 1024 ? 4 : 8;
  },
  { immediate: true }
);
</script>

<template>
  <section class="c-WeatherIndicator">
    <div class="c-WeatherIndicator__header">
      <Button
        icon="pi pi-chevron-left"
        aria-label="Previous day"
        :disabled="!canGoBackward(24)"
        @click="previousPage(24)"
      />

      <h2>{{ currentDay }}</h2>

      <Button
        icon="pi pi-chevron-right"
        aria-label="Next day"
        :disabled="!canGoForward(24)"
        @click="nextPage(24)"
      />
    </div>

    <section class="c-WeatherIndicator__segments">
      <Button
        icon="pi pi-chevron-left"
        aria-label="Previous"
        :disabled="!canGoBackward()"
        @click="previousPage()"
      />

      <div class="c-WeatherIndicator__segmentRow">
        <WeatherCard
          v-for="details in page"
          :key="details.id"
          :model-value="selected === details.id"
          :details="details"
          @update:model-value="onSelected(details.id)"
        />
      </div>

      <Button
        icon="pi pi-chevron-right"
        aria-label="Next"
        :disabled="!canGoForward()"
        @click="nextPage()"
      />
    </section>

    <Transition name="fade" appear>
      <section
        class="c-WeatherIndicator__details"
        v-if="selectedDetails !== null"
      >
        <img
          :src="`/${selectedDetails.icon}.gif`"
          :alt="selectedDetails.icon"
        />

        <div>
          You will find a <b>{{ selectedDetails.icon }}</b> weather at
          <b> {{ selectedDetails.time }} </b>.

          <br />

          The temperature will round the
          <b>
            {{ selectedDetails.temperature_2m }}
          </b>
          , but will be <b>{{ selectedDetails.apparent_temperature }}</b> in the
          sky.
        </div>
      </section>
    </Transition>
  </section>
</template>

<style lang="css" scoped>
.c-WeatherIndicator__header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

h2 {
  color: var(--color-heading);
  font-weight: 800;
  margin: 0 1rem;
}

.c-WeatherIndicator__segments {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.c-WeatherIndicator__segmentRow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.c-WeatherIndicator__details {
  margin: 4rem 0;
  padding: 1rem 2rem;
  text-align: center;
}

.c-WeatherIndicator__details > img {
  width: 10rem;
}

@media (max-width: 700px) {
  .c-WeatherIndicator__segmentRow {
    flex-direction: column;
  }

  .c-WeatherIndicator__segments {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
}
</style>
