<template>
  <p
    class="font-bold"
    :class="{
      'text-green-400': method === 'GET',
      'text-yellow-400': method === 'POST',
      'text-blue-400': method === 'PUT',
      'text-purple-400': method === 'PATCH',
      'text-red-400': method === 'DELETE',
    }"
  >
    {{ method }}
  </p>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    method: String,
  },
});
</script>
