<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    type="text"
    class="px-4 py-2 border-1 focus:outline-none input rounded-md"
    :placeholder="placeholder"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
});
</script>

<style scoped>
.input {
  background-color: var(--second-bg-color);
  border: 1px solid var(--border-color);
}
</style>
