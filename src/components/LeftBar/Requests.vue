<template>
  <ul>
    <li
      v-for="request in requests"
      class="px-5 py-2 flex justify-between Request items-center"
    >
      <div class="flex gap-2 items-center">
        <RequestMethod :method="request.method" />
        <p>{{ request.name }}</p>
      </div>

      <div class="flex gap-2">
        <Button class="text-yellow-500 Button px-2 py-1 rounded-md"
          >&#9998;</Button
        >
        <Button class="text-red-500 Button px-2 py-1 rounded-md">✖</Button>
      </div>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from "vue";
import RequestMethod from "./RequestMethod.vue";

export default defineComponent({
  props: {
    requests: Array,
  },
  components: { RequestMethod },
});
</script>

<style scoped>
.Request {
  background-color: var(--second-bg-color);
}

.Request:hover {
  background-color: var(--border-color);
}

.Button:hover {
  background-color: var(--main-bg-color);
}
</style>
