<template>
  <input
    :value="modelValue"
    @input="updateModelValue"
    type="text"
    class="px-4 py-2 border-1 focus:outline-none input rounded-md"
    :placeholder="placeholder"
  />
</template>

<script lang="ts" setup>
interface Props {
  placeholder: string;
  modelValue: string;
}

interface Emits {
  (e: "update:modelValue", value: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

function updateModelValue(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<style scoped>
.input {
  background-color: var(--second-bg-color);
  border: 1px solid var(--border-color);
}
</style>
