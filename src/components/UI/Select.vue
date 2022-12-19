<template>
  <div class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { Methods, TMethods } from "@/store/request";

interface Props {
  options: TMethods[];
  default?: TMethods;
}

interface Emits {
  (e: "input", value: TMethods): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const open = ref(false);
const selected = ref<TMethods | null>(
  props.default ? props.default : props.options.length > 0 ? props.options[0] : null
);

watch(props, (value) => {
  selected.value = value.default ?? Methods.GET;
});

onMounted(() => {
  emit("input", selected.value ?? Methods.GET);
});
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
}

.custom-select .selected {
  background-color: var(--second-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem 0 0 0.375rem;
  color: #fff;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select {
  border-radius: 0.375rem 0 0 0.375rem;
}

.selected.open {
  border-radius: 0.375rem 0 0 0.375rem;
}
.selected {
  height: 100%;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 0.375rem solid transparent;
  border-color: #fff transparent transparent transparent;
}

.custom-select .items {
  color: #fff;
  border-radius: 0.375rem;
  overflow: hidden;
  position: absolute;
  background-color: var(--second-bg-color);
  left: 0;
  right: 0;
  z-index: 1;
}
.items {
  margin-top: 0.75rem;
  border: 1px solid var(--border-color);
}

.custom-select .items div {
  color: #fff;
  padding-left: 1rem;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: var(--main-color);
}

.selectHide {
  display: none;
}
</style>
