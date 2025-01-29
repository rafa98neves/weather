<script setup lang="ts">
import { ref, watch } from "vue";

import { refDebounced } from "@vueuse/core";
import AutoComplete from "primevue/autocomplete";

import { useLocalization } from "@/stores/localizations";
import type { ILocation } from "@/types/localizations";

const localizationStore = useLocalization();

const model = defineModel();

const search = ref<string>("");
const items = ref<ILocation[]>([]);
const debounced = refDebounced(search, 1000);

function onSearch(ev: { value: ILocation }) {
  model.value = ev.value;
}

watch(debounced, async () => {
  if (typeof debounced.value !== "string") return;
  const data = await localizationStore.search(debounced.value);
  items.value = data;
});
</script>

<template>
  <AutoComplete
    v-model="search"
    :suggestions="items"
    class="w-100"
    option-label="name"
    input-class="w-100"
    placeholder="Search for a location"
    :auto-option-focus="false"
    dropdown
    @optionSelect="onSearch"
  >
    <template #option="{ option }">
      <p>
        <span> {{ option.name }} </span>
        <span class="text-secondary" v-if="option.name !== option.country">
          {{ option.country }}
        </span>
      </p>
    </template>
  </AutoComplete>
</template>

<style lang="css" scoped>
.text-secondary {
  margin-left: 0.5rem;
}
</style>
