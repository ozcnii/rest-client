<template>
  <p
    class="font-bold"
    :class="{
      'text-green-400': method === Methods.GET,
      'text-yellow-400': method === Methods.POST,
      'text-blue-400': method === Methods.PUT,
      'text-purple-400': method === Methods.PATCH,
      'text-red-400': method === Methods.DELETE,
    }"
  >
    {{ method }}
  </p>
</template>

<script lang="ts" setup>
import { Methods } from "@/store/request";

interface Props {
  method: Methods;
}

defineProps<Props>();
</script>
