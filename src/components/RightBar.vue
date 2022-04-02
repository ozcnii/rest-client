<template>
  <div class="h-full grow flex flex-col relative">
    <LoadigModal v-if="isLoading" />

    <div v-if="requestResult && requestTime" class="grow flex flex-col">
      <div class="mb-3 flex gap-3">
        <div class="px-4 rounded-md py-2 result-item">{{ requestTime }} ms</div>

        <div class="px-4 rounded-md py-2 bg-green-600">
          {{ statusCode }}
        </div>
      </div>

      <div class="mr-3 relative overflow-y-auto h-full w-full">
        <div class="absolute inset-0 pr-2">
          <Prism language="javascript" class="prism rounded-md">
            {{ requestResult }}
          </Prism>
        </div>
      </div>
    </div>

    <div v-if="error && requestTime && !isLoading">
      <div class="flex mb-3">
        <div class="px-4 rounded-md py-2 mr-3 result-item">
          {{ requestTime }} ms
        </div>
        <div class="px-4 rounded-md bg-red-500 py-2 mr-3">
          {{ statusCode }}
        </div>
      </div>

      <div class="result-item rounded-md p-3">
        {{ error }}
      </div>
    </div>

    <div
      v-if="!requestResult && !error && !isLoading"
      class="text-3xl flex justify-center items-center h-full"
    >
      Hello!
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Prism from "vue-prism-component";
import LoadigModal from "./LoadigModal.vue";
import { mapState } from "vuex";

export default defineComponent({
  components: {
    Prism,
    LoadigModal,
  },

  computed: {
    ...mapState([
      "isLoading",
      "requestResult",
      "error",
      "statusCode",
      "requestTime",
    ]),
  },
});
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
