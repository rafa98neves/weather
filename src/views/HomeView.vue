<script setup lang="ts">
import { ref } from "vue";

import type { ILocation } from "@/types/localizations";
import LocalSearch from "@/components/organisms/LocalSearch.vue";
import WeatherDisplay from "@/components/organisms/WeatherDisplay.vue";

const location = ref<ILocation>();
</script>

<template>
  <main>
    <header>
      <LocalSearch v-model="location" />
    </header>

    <WeatherDisplay :location="location" />
  </main>
</template>

<style lang="css" scoped>
main {
  height: 100vh;
  display: grid;
  grid-template-rows: 10rem max-content;
  align-items: center;
}

header {
  margin-bottom: 2rem;
}
</style>
