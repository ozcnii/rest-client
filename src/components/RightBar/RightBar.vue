<template>
  <div class="h-full grow flex flex-col relative">
    <LoadigModal v-if="requestStore.isLoading" />

    <div
      v-if="requestStore.requestResult && requestStore.requestTime"
      class="grow flex flex-col"
    >
      <div class="mb-3 flex gap-3">
        <div class="px-4 rounded-md py-2 result-item">
          {{ requestStore.requestTime }} ms
        </div>

        <div class="px-4 rounded-md py-2 bg-green-600">
          {{ requestStore.statusCode }}
        </div>
      </div>

      <div class="mr-3 relative overflow-y-auto h-full w-full">
        <div class="absolute inset-0 pr-2">
          <Prism language="javascript" class="prism rounded-md">
            {{ requestStore.requestResult }}
          </Prism>
        </div>
      </div>
    </div>

    <div v-if="requestStore.error && requestStore.requestTime && !requestStore.isLoading">
      <div class="flex mb-3">
        <div class="px-4 rounded-md py-2 mr-3 result-item">
          {{ requestStore.requestTime }} ms
        </div>
        <div class="px-4 rounded-md bg-red-500 py-2 mr-3">
          {{ requestStore.statusCode }}
        </div>
      </div>

      <div class="result-item rounded-md p-3">
        <Prism language="javascript" class="prism rounded-md">
          {{ requestStore.error }}
        </Prism>
      </div>
    </div>

    <div
      v-if="!requestStore.requestResult && !requestStore.error && !requestStore.isLoading"
      class="text-3xl flex justify-center items-center h-full"
    >
      Hello!
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import Prism from "vue-prism-component";
import { useRequestStore } from "@/store/request";
import LoadigModal from "@/components/RightBar/LoadigModal.vue";

const requestStore = useRequestStore();
</script>

<style scoped>
.prism {
  margin: 0;
  background-color: var(--second-bg-color);
}
.result-item {
  background-color: var(--border-color);
}
</style>
