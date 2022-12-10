<template>
  <p :class="`font-bold text-${color}-400`" z>
    {{ method }}
  </p>
</template>

<script lang="ts" setup>
import { Methods } from "@/store/request";
import { methodColors } from "@/utils";

interface Props {
  method: Methods;
}

const props = defineProps<Props>();
const color = methodColors[props.method];
</script>
